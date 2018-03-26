/**
 * 组件 Tab
 */
function Tab(node) {
  this.node = node;
  this.activeClass = 'active';
  this.init();
}

Tab.prototype = {
  constructor: Tab,

  init: function() {
    this.tabs = Array.from(this.node.querySelector('ul.tabs').querySelectorAll('li'));
    this.panels = Array.from(this.node.querySelector('div.tab-content').querySelectorAll('div.tab-panel'));
    this.bind();
    
  },

  bind: function(ev) {
    this.node.addEventListener('click', function(ev) {
      ev.preventDefault();
      if (ev.target.nodeName === 'A') {
        const id = ev.target.hash.replace('#', '');
  
        const parent = ev.target.parentElement;
        if (!parent.classList.contains('active')) {
          for(let tab of this.tabs) {
            if (tab.classList.contains('active')) {
              tab.classList.remove('active');
            }
          }
          parent.classList.add('active');
        }
  
        for(let panel of this.panels) {
          if (panel.id === id && !panel.classList.contains(this.activeClass)) {
            panel.classList.add(this.activeClass);
          }
          if (panel.id !== id && panel.classList.contains(this.activeClass)) {
            panel.classList.remove(this.activeClass);
          }
        }
      }
    }.bind(this));
  }
};

/**
 * 组件 AnimateTab，继承自 Tab，增加动画效果。
 */
function AnimateTab(node) {
  this.node = node;
  this.activeClass = 'active-fadeIn';
  this.init();
}

AnimateTab.prototype = {
  ...Tab.prototype,
  constructor: AnimateTab
};