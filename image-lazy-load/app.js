(function(global) {
  class Event {
    static on(type, handler) {
      return document.addEventListener(type, handler);
    }
    static off(type, handler) {
      return document.removeEventListener(type, handler);
    }
    static one(type, handler) {
      const wrapperHanlder = event => {
        handler(event);
        Event.off(type, wrapperHanlder);
      }
      return Event.on(type, wrapperHanlder);
    }
    static trigger(type, data) {
      return document.dispatchEvent(new CustomEvent(type, {
        detail: data
      }));
    }
  }
  
  class Image {
    constructor(height = 400) {
      // 高度为固定值，宽度为 200 至 800 之间的随机数
      this.width = Math.floor(Math.random() * 501) + 300;
      this.height = Math.floor(height);
      // 图片预载入依赖于确定的 URL
      this.url = `https://picsum.photos/${this.width}/${this.height}/?image=${Math.floor(Math.random() * 1085)}`;
    }
  
    // 图片预加载，给你丝滑般的加载体验
    preload(callback) {
      const resolve = () => {
        this.$el = $(`<img src="${this.url}" style="height: ${this.height}px" />`);
        callback(this);
        Event.trigger('PRELOAD_RESOLVED');
      }

      const reject = () => {
        Event.trigger('PRELOAD_RESOLVED');
      }
  
      const image = new window.Image();
      image.src = this.url;
  
      if(image.complete) {
        resolve();
      } else {
        image.onload = resolve;
        image.onerror = reject;
      }
    }
  }
  
  class Loader {
    constructor (heightBase) {
      this.buffer = [];
      this.isLoading = false;
      this.heightBase = heightBase;
      this.loadMore();
    }
  
    loadMore(count = 40) {
      let loaded = 0;
  
      const innerLoad = () => {
        this.isLoading = true;
  
        const resolvedHandler = () => {
          loaded += 1;
          if (loaded === count) {
            this.isLoading = false;
            Event.off('PRELOAD_RESOLVED', resolvedHandler);
          }
        }
        Event.on('PRELOAD_RESOLVED', resolvedHandler);
  
        for(let i = 0; i < count; i++) {
          new Image(this.heightBase).preload(image => {
            this.buffer.push(image);
          })
        }
      }
  
      // 加载节流
      if (!this.isLoading) {
        innerLoad();
      }
    }
  
    shift() {
      const item = this.buffer.shift();
      if (this.buffer.length < 10) {
        this.loadMore();
      }
      return item;
    }
  }
  
  class Barrel {
    constructor() {
      this.container = $('.container');
      this.window = $(window);
      this.data = [];
      this.rowList = [];
      this.rowTotalWidth = 0;
      this.loader = new Loader(this.heightBase);
      this.isRendering = false;
      this.bind();
    }
  
    get heightBase () {
      return this.window.height() / 3.2;
    }
  
    get width() {
      return this.container.width();
    }
  
    get height() {
      return this.container.height();
    }
  
    bind() {
      this.window.scroll(this.onScroll.bind(this));
      this.window.resize(this.onResize.bind(this));
    }
  
    onScroll() {
      const scrollTop = this.window.scrollTop();
      const windowHeight = this.window.height();
      // 滚动到底部时，渲染新的图片
      if (scrollTop + windowHeight > this.height) {
        this.render();
      }
    }
  
    onResize() {
      const innerResize = () => {
        if (this.isRendering) {
          setTimeout(innerResize, 1000);
        } else {
          this.loader.heightBase = this.heightBase;
          this.rowList = [];
          this.rowTotalWidth = 0;
          this.data.forEach(item => {
            this.layout(item);
          })
        }
      }
  
      innerResize();
    }
  
    render() {
      const innerRender = (count) => {
        if (Number.isInteger(count) && count > 1) { 
          const image = this.loader.shift();
  
          if (!image) {
            setTimeout(() => {
              innerRender(count);
            }, 1000);
          } else {
            this.container.append(image.$el);
            this.data.push(image);
            this.layout(image);
            innerRender(count - 1);
          }
        } else {
          this.isRendering = false;
        }
      }
  
      // 渲染节流
      if (!this.isRendering) {
        this.isRendering = true;
        innerRender(20);
      }
    }
  
    layout(image) {
      if (this.rowTotalWidth + image.width < this.width) {
        this.rowList.push(image);
        this.rowTotalWidth += image.width;
      } else {
        this.rowList.forEach(item => {
          item.$el.width(`${item.width / this.rowTotalWidth * 100}%`);
          item.$el.height(`${this.heightBase * this.width / this.rowTotalWidth}px`)
        });
        this.rowList = [image];
        this.rowTotalWidth = image.width;
      }
    }
  }
  
  const barrel = new Barrel();
  barrel.render();

  global.barrel = barrel;
}(window))