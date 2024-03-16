// Check if acdlDataLayer is not available and add it through your script
if (typeof acdlDataLayer === 'undefined') {
    window.acdlDataLayer = [];
  }

class DynamicSPA {
  constructor() {
    this.initialize();
    this.observePageChanges();
  }

  initialize() {
    this.handleInitialPageLoad();
    this.setupEventListeners();
  }

  handleInitialPageLoad() {
    const pageViewNodes = document.querySelectorAll('[data-id="pageview"]');
    if (pageViewNodes.length > 0) {
      const lastPageViewNode = pageViewNodes[pageViewNodes.length - 1];
      this.handlePageView(lastPageViewNode.getAttribute('data-event-name'), lastPageViewNode.getAttribute('data-event-type'));
    }
  }

  handlePageView(eventName, eventType) {
    console.log('Page View triggered');
    console.log(`Event Name: ${eventName}, Event Type: ${eventType}`);
    
    // Push event data to acdlDataLayer
    acdlDataLayer.push({
      event: 'pageview',
      eventName: eventName,
      eventType: eventType
    });
    
    // Your logic to send page view data to analytics service or perform any other action
  }

  handleClickEvent(node) {
    console.log('Click Event detected');
    const eventName = node.getAttribute('data-event-name');
    const eventType = node.getAttribute('data-event-type');
    console.log(`Event Name: ${eventName}, Event Type: ${eventType}`);
    
    // Push event data to acdlDataLayer
    acdlDataLayer.push({
      event: 'click',
      eventName: eventName,
      eventType: eventType
    });
    
    // Your logic to handle click event
  }

  setupEventListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-id="click"]');
      if (target) {
        this.handleClickEvent(target);
      }
    });
  }

  observePageChanges() {
    const targetNode = document.documentElement || document.body;
    if (targetNode) {
        const observer = new MutationObserver((mutationsList, observer) => {
            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.getAttribute('data-id') === 'pageview') {
                        console.log('Added HTML via mutation');
                        this.handleInitialPageLoad();
                    }
                });
            });
        });

        const config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
    } else {
        console.error("Invalid target node.");
    }
  }
}

const dynamicSPA = new DynamicSPA();