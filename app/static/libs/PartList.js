'use strict';

export default class LibPartsList {
  constructor(l, key = 'solt') {
    this.l = l
    this.key = key
  }
  insert(l) {
    let key = this.key
    if (l.length > 1) {
      for (let i = 0; i < l.length; i++) {
        if (!l[i].props) {
          console.warn('l ' + i + ' no props')
          continue
        }
        for (let j = 0; j < this.l.length; j++) {
          if (!this.l[j].props) {
            console.warn('this.l ' + i + ' no props')
            continue
          }
          if (l[i].props[key] == this.l[j].props[key]) {
            this.l[j] = l[i]
          }
        }
      }
    } else {
      for (let i = 0; i < this.l.length; i++) {
        if (!l.props || !this.l[i].props) {
          console.warn('l||this.l ' + i + ' no props')
          continue
        }
        if (l.props[key] == this.l[i].props[key]) {
          this.l[i] = l
        }
      }
    }
    return this.l
  }
}
