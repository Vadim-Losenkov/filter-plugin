class Filter {

  constructor(selector, settings) {

    this.$main = document.querySelector(selector)
    this.settings = settings
    
    this.$filter = []
    this.$items = []
    
    this.activeElements = []
    this.init()
  }
  
  init() {
    this.filterInit()
    this.itemsInit()
    
    this.activeElements = this.$items
    this.filterItems(this.settings.filter.activeElements)
  }
  
  filterInit() {
    this.$filter = this.settings.filter.selectors.map(selector => {
      if (typeof selector === 'string') {
        return this.$main.querySelector(selector)
      }
      return selector
    })
          
    this.$filter.forEach($el => {
      const act = $el.querySelector(`[data-target=${this.settings.filter.activeElements}]`)
          .classList.add(this.settings.filter.activeItemClass)
          
      $el.addEventListener('click', () => {
      $el.querySelectorAll('[data-target]').forEach($filterEl => $filterEl.classList.remove(this.settings.filter.activeItemClass))
      const $btn = event.target.closest('[data-target]')
      
      if ($btn) {
        $btn.classList.add(this.settings.filter.activeItemClass)
        const type = $btn.dataset.target
        this.filterItems(type)
      }
    })
    })
  }
  
  itemsInit() {
    const $main = this.$main.querySelector(this.settings.items.wrapper)
    this.$items = $main.querySelectorAll(this.settings.items.item)
  }
  
  filterItems(type) {
    this.classAdder(this.activeElements, 'remove')
    setTimeout(() => {
      this.activeElements = []
      this.$items.forEach($item => {
        const attr = JSON.parse($item.getAttribute('data-groups'))
        if (attr.includes(type)) {
          this.activeElements.push($item)
        }
      })
      this.classAdder(this.activeElements, 'add')
    }, this.settings.transitionSpeed);
  }
  
  classAdder($elements, type) {
    let disp
    if (type === 'remove') {
      $elements.forEach($el => {
        disp = $el.style.display
        $el.classList.remove('l-filter--visible')
        $el.classList.add('l-filter--hidden')
      })
      setTimeout(function() {
        $elements.forEach($el => {
          $el.style.display = 'none'
        })
      }, this.settings.transitionSpeed);
    } else if (type === 'add') {
      $elements.forEach($el => {
        $el.style.display = 'block'
      })
      $elements.forEach($el => {
        setTimeout(() => {
          $el.classList.add('l-filter--visible')
          $el.classList.remove('l-filter--hidden')
        }, 50);
      })
    }
  }
}