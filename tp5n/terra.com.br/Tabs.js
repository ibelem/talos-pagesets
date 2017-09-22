var Tabs = (function Tabs() {

	var PUBLIC_CLASS_SCOPE = this,
		STATIC,
		PRIVATE;

	STATIC = function (customOptions) {

		if (this === PUBLIC_CLASS_SCOPE) {
			throw new Error('Tabs � uma classe e, portanto, deve ser instanciada atrav�s da instru��o "new"', location.href, 0);
		}

		if (!PRIVATE) {
			PRIVATE = {
				defaultOptions: {
					considerHash: false
				}
			};
		}

		// PRIVATE
		var INSTANCE = this,
			urlHash = (/.(#([\w-_]+))?$/).exec(location.href)[1],
			tabOpenedTimes = {},
			callbackFunctionsArray = [],
			tabsListContainer,
			selectedTab,
			tabsContentContainer,
			lastContainerOpened,
			currentTab,
			contentReference,
			tabId,
			i,

			validateParams = function () {
				// c�digo para setar as vari�veis de configura��o
				INSTANCE.options = $.extend({}, PRIVATE.defaultOptions, customOptions || {});

				// c�digo para valida��o dos par�metros da Classe
				if ((typeof INSTANCE.options.tabsListContainer !== 'string') && (typeof INSTANCE.options.tabsListContainer !== 'object') || (!$(INSTANCE.options.tabsListContainer).length)) {
					throw new Error('N�o foi encontrado o n� com seletor ' + INSTANCE.options.tabsListContainer, location.href, 0);
				}

				if ((typeof INSTANCE.options.tabsContentContainer !== 'string') && (typeof INSTANCE.options.tabsListContainer !== 'object') || (!$(INSTANCE.options.tabsContentContainer).length)) {
					throw new Error('N�o foi encontrado o n� com seletor ' + INSTANCE.options.tabsContentContainer, location.href, 0);
				}

				//seta as vari�veis locais
				tabsListContainer = $(INSTANCE.options.tabsListContainer);
				selectedTab = tabsListContainer.find('li.selected');
				tabsContentContainer = $(INSTANCE.options.tabsContentContainer);
				lastContainerOpened = tabsContentContainer.children().not('.hide');
				tabId = selectedTab.children('a').attr('href');
			},

			fireCallbacks = function (handler) {
				try {
					handler(tabId, tabOpenedTimes[tabId]);
				} catch (e) {
					e.message = '[Tabs] � Erro na fun��o de callback associada a uma inst�ncia do tabs. >> ' + e.message;

					if (window.modMan) {
						modMan.log.critical(e);
					} else if (window.console) {
						console.log(e.message);
					}
				}
			},

			tabOpened = function () {
				if (tabOpenedTimes[tabId]) {
					tabOpenedTimes[tabId]++;
				} else {
					tabOpenedTimes[tabId] = 1;
				}

				for (i = 0;  i < callbackFunctionsArray.length; i++) {
					fireCallbacks(callbackFunctionsArray[i]);
				}

			},

			validateHash = function () {

				var tabHash = tabsListContainer.find('a[href=' + urlHash + ']'),
					selectedTabWithHash,
					tabsContentContainerWithHash;

				if (urlHash && tabHash.length > 0) {

					if (tabId !== urlHash) {
						selectedTabWithHash = tabHash.parent('li');
						tabsContentContainerWithHash = tabsContentContainer.find(urlHash);

						selectedTab.removeClass('selected');
						selectedTabWithHash.addClass('selected');

						lastContainerOpened.addClass('hide');
						tabsContentContainerWithHash.removeClass('hide');

						selectedTab = selectedTabWithHash;
						lastContainerOpened = tabsContentContainerWithHash;

						tabId = urlHash;
					}

				}
			},

			bindEvents = function () {

				$(INSTANCE.options.tabsListContainer).find('li').click(function (evt) {
					if (INSTANCE.options.considerHash === false) {
						evt.preventDefault();
					}
					currentTab = $(this);
					tabId = currentTab.find('a').attr('href');

					INSTANCE.changeTabTo(tabId);
				});

			};

		// PUBLIC
		INSTANCE.changeTabTo = function (newTabId) {
			if (selectedTab.html() != currentTab.html()) {
				selectedTab.removeClass('selected');
				currentTab.addClass('selected');
				selectedTab = currentTab;
				contentReference = selectedTab.find('a').attr('href');
				lastContainerOpened.addClass('hide');
				contentReference = tabsContentContainer.find(contentReference);
				contentReference.removeClass('hide');
				lastContainerOpened = contentReference;
				tabId = newTabId;
				tabOpened();
			}

			return INSTANCE;
		};

		//M�todo p�blico que passa Callbacks para a fun��o
		INSTANCE.setOnLoadTab = function (handler) {
			if (typeof handler === 'function') {
				callbackFunctionsArray.push(handler);
			}
			fireCallbacks(handler);
			return INSTANCE;
		};

		INSTANCE.unsetOnLoadTab = function () {
			callbackFunctionsArray = [];
			return INSTANCE;
		};

		// constructor
		validateParams();
		if (INSTANCE.options.considerHash === true) {
			validateHash();
		}
		bindEvents();
		tabOpened();

	};

	return STATIC;

}(Tabs));