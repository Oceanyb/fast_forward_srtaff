'use strict';

export default class ChildrenToFun {
  constructor(c) {
    this.c = c
  }
  toFun() {
    let c = this.c
    let list = {}
    if (c.length > 1) {
      c.map((v, i) => {
        if (v.props && v.props.fun) {
          list[v.props.fun] = v
        }
      })
    } else {
      if (v.props && v.props.fun) {
        list[c.props.fun] = c
      }
    }
    return list
  }
}
