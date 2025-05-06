export function createElement(type, props, ...children) {
  const virtualDom = {
    $$typeof: Symbol.for("react.element"),
    type,
    props: {
      ...props,
    },
  };
  if (children.length > 0) {
    // 处理 children
    if (children.length === 1 && typeof children[0] === "object") {
      virtualDom.props.children = children[0];
    } else {
      virtualDom.props.children = children;
    }
  }
  return virtualDom;
}

// 迭代 obj 的所有私有属性
function each(obj, callback) {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("obj must be an object");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  const keys = Reflect.ownKeys(obj);
  keys.forEach((key) => {
    const value = obj[key];
    callback(key, value);
  });
}

export function render(virtualDom, container) {
  const { type, props } = virtualDom;
  if (typeof type === "string") {
    // 1. 创建真实 DOM
    const dom = document.createElement(virtualDom.type);
    // 2. 设置属性
    each(virtualDom.props, (key, value) => {
      if (key === "children") {
        if (!Array.isArray(value)) value = [value];
        value.forEach((child) => {
          if (typeof child === "string" || typeof child === "number") {
            const textNode = document.createTextNode(child);
            dom.appendChild(textNode);
          } else {
            render(child, dom);
          }
        });
      } else if (key === "className") {
        dom.setAttribute("class", value);
      } else if (key === "style") {
        // style 是一个对象
        each(value, (styleKey, styleValue) => {
          dom.style[styleKey] = styleValue;
        });
      } else {
        dom.setAttribute(key, value);
      }
    });
    // 3. 挂载到容器上
    container.appendChild(dom);
  }
}
