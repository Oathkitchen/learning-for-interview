export function createElement(type, props, ...children) {
  const virtualDom = {
    $$typeof: Symbol.for("react.element"),
    type,
    props: {
      ...props,
    },
  }
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