(function(global) {

  const ITEM_WIDTH = 236;
  const ITEM_MARGIN = 20;

  class Container {
    constructor(clientWidth) {
      this.colCount = this.calCount(clientWidth);
      this.$el = $('.container').eq(0);
      this.initWaterfall();
      this.data = [];
    }

    get height() {
      return this.heights[this.maxHeightCol];
    }

    initWaterfall() {
      this.heights = [ ];
      for(let i=0; i<this.colCount; i++) {
        this.heights[i] = 0;
      }
      this.minHeightCol = 0;
      this.maxHeightCol = 0;

      this.$el.css({
        width: (ITEM_WIDTH + ITEM_MARGIN) * this.colCount - ITEM_MARGIN
      });
    }

    calCount(clientWidth) {
      const count = Math.floor((clientWidth + ITEM_MARGIN) / (ITEM_WIDTH + ITEM_MARGIN));
      return count > 6 ? 6 : count;
    }

    resize(clientWidth) {
      const colCount = this.calCount(clientWidth);
      if(colCount !== this.colCount) {
        this.colCount = colCount;
        this.initWaterfall();

        this.data.forEach(item => {
          item.css({
            opacity: 0
          });
        });
        this.data.forEach(item => {
          this.place(item);
        })
      }
    }

    render(news) {
      this.preloadImage(news.img_url)
        .then(() => {
          let $item = $(`<div class="item">
            <div class="item-header">
              <a href="${news.url}" target="__blank">
                <img class="cover" src="${news.img_url}" />
              </a>
            </div>
            <div class="item-content">
              <span class="extra">${moment(news.createtime).fromNow()}</span>
              <a href="${news.url}" target="__blank">
                <h3>${news.name}</h3>
              </a>
              <span>${news.short_intro}<span>
            </div>
          </div>`);
          this.$el.append($item);
          this.data.push($item);
          this.place($item);
        })
    }

    place($item) {
      const height = $item.height() + ITEM_MARGIN;
      $item.css({
        left: (ITEM_MARGIN + ITEM_WIDTH) * this.minHeightCol,
        top: this.heights[this.minHeightCol],
        opacity: 1
      });

      this.heights[this.minHeightCol] += height;

      this.minHeightCol = 0;
      this.maxHeightCol = 0;
      for(let i=1; i<this.heights.length; i++) {
        if (this.heights[i] < this.heights[this.minHeightCol]) {
          this.minHeightCol = i;
        }
        if (this.heights[i] > this.heights[this.maxHeightCol]) {
          this.maxHeightCol = i;
        }
      }

      this.$el.css({
        height: this.heights[this.maxHeightCol]
      })
    }

    preloadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new window.Image();
        image.src = url;

        if (image.complete) {
          resolve();
        } else {
          image.onload = resolve;
          image.onerror = reject;
        }
      })
    }
  }

  class App {
    constructor () {
      this.curPage = 1;
      this.perPageCount = 20;
      this.window = $(window);
      this.container = new Container(this.window.width());
      this.isLoading = false;
      this.bind();
    }

    bind() {
      this.window.scroll(this.onScroll.bind(this));
      this.window.resize(this.onResize());
    }

    onResize() {
      let resizeHandler;

      return () => {
        if (resizeHandler) {
          clearTimeout(resizeHandler);
        }
        resizeHandler = setTimeout(() => {
          this.container.resize(this.window.width());
          resizeHandler = undefined;
        }, 300);
      }
    }

    onScroll() {
      const scrollTop = this.window.scrollTop();
      const windowHeight = this.window.height();
      // 滚动到底部时，渲染新的图片
      if (scrollTop + windowHeight > this.container.height) {
        this.loadMore();
      }
    }

    loadMore () {
      if (this.isDevelopment) {
        this.mockLoad();
      } else {
        this.realLoad();
      }
    }

    realLoad() {
      if (!this.isLoading) {
        this.isLoading = true;
        $.ajax({
          url: 'http://platform.sina.com.cn/slide/album_tech',
          dataType: 'jsonp',
          jsonp:"jsoncallback",
          data: {
            app_key: '1271687855',
            num: this.perPageCount,
            page: this.curPage++
          }
        }).done(response => {
          if(response && response.status && response.status.code === "0"){
            response.data.forEach(item => {
              this.container.render(item);
            })
          }else{
            console.log('get error data');
          }

          this.isLoading = false;
        });
      }
    }

    mockLoad() {
      $.ajax({
        url: '/data.json',
        dataType: 'json'
      }).done(response => {
        response.data.forEach(item => {
          this.container.render(item);
        })
      })
    }

    get isDevelopment() {
      return window.location.href.indexOf('localhost') !== -1;
    }

    start() {
      this.loadMore();
    }
  }

  $(document).ready(function() {
    new App().start();
  });
}(window))
