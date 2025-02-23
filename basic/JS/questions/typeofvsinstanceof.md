在 JavaScript 中，`typeof` 和 `instanceof` 是两种用于类型判断的操作符，但它们的用途和底层机制完全不同。以下是它们的核心区别和适用场景：

---

### **一、`typeof`**
#### **作用**  
返回一个 **基本数据类型** 的字符串表示，适用于快速判断原始类型。

#### **语法**  
```javascript
typeof operand
```

#### **返回值**  
| 操作数类型              | 返回值         | 例外情况                      |
|-------------------------|----------------|------------------------------|
| `undefined`             | `"undefined"`  | 无                            |
| `Boolean`               | `"boolean"`    | 无                            |
| `Number`                | `"number"`     | `typeof NaN` → `"number"`      |
| `String`                | `"string"`     | 无                            |
| `Symbol`                | `"symbol"`     | 无                            |
| `BigInt`                | `"bigint"`     | 无                            |
| `Function`              | `"function"`   | 仅函数会返回 `"function"`      |
| 其他对象（包括 `null`） | `"object"`     | `typeof null` → `"object"`（历史遗留问题） |

#### **示例**  
```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof function(){});// "function"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"（无法区分数组）
console.log(typeof null);        // "object"（陷阱！）
```

#### **适用场景**  
- 快速判断变量是否为 `undefined` 或未声明。
- 区分基本类型（如 `number`、`string`、`boolean`）。
- 检测函数类型。

---

### **二、`instanceof`**
#### **作用**  
判断一个对象是否属于某个 **构造函数** 的实例（检查原型链）。

#### **语法**  
```javascript
object instanceof Constructor
```

#### **返回值**  
- `true`：对象的原型链中包含 `Constructor.prototype`。
- `false`：不包含，或操作数不是对象。

#### **示例**  
```javascript
console.log([] instanceof Array);       // true
console.log({} instanceof Object);      // true
console.log(new Date() instanceof Date);// true

// 陷阱：跨全局对象（如 iframe）
const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
const iframeArray = iframe.contentWindow.Array;
const arr = new iframeArray();
console.log(arr instanceof Array);      // false（不同全局环境的 Array）

// 基本类型无法判断
console.log(123 instanceof Number);     // false（除非 new Number(123)）
```

#### **适用场景**  
- 检测对象是否是某个类的实例（如 `Array`、`Date`、自定义类）。
- 判断对象继承关系（如 `childObj instanceof ParentClass`）。

---

### **三、核心区别总结**
| **特性**            | `typeof`                          | `instanceof`                      |
|---------------------|-----------------------------------|-----------------------------------|
| **操作数类型**       | 任意值（包括基本类型和对象）        | 必须是对象（基本类型返回 `false`）  |
| **返回值类型**       | 字符串（描述基本类型）              | 布尔值（判断对象类型）              |
| **检测原理**         | 根据语言规范直接判断类型             | 检查原型链是否包含构造函数原型       |
| **跨全局对象问题**   | 无影响（直接返回类型）              | 可能失效（不同全局环境的构造函数）   |
| **特殊值处理**       | `typeof null` → `"object"`         | `null instanceof Object` → `false` |

---

### **四、常见问题与解决方案**
#### **1. 如何区分数组和普通对象？**
- **避免使用 `typeof`**：`typeof []` 和 `typeof {}` 均返回 `"object"`。
- **正确方法**：  
  ```javascript
  console.log(Array.isArray([])); // true（推荐）
  console.log([] instanceof Array); // true（注意跨全局问题）
  ```

#### **2. 如何检测 `null`？**
- **`typeof` 陷阱**：`typeof null` 返回 `"object"`。
- **正确方法**：  
  ```javascript
  console.log(value === null); // 直接严格相等判断
  ```

#### **3. 如何安全检测基本类型的包装对象？**
```javascript
const num = new Number(123);
console.log(typeof num);        // "object"
console.log(num instanceof Number); // true
```

---

### **五、总结**
- **`typeof`**：  
  适用于快速判断基本类型（`undefined`、`boolean`、`number`、`string`、`symbol`、`bigint`）和函数，但对对象类型无法细分（如数组、普通对象、`null`）。

- **`instanceof`**：  
  适用于检测对象的具体类型（如数组、日期、自定义类），但无法检测基本类型，且需注意跨全局环境问题。

**组合使用示例**：  
```javascript
function getType(value) {
  if (value === null) return "null";
  if (typeof value !== "object") return typeof value;
  if (Array.isArray(value)) return "array";
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getType([])); // "array"
console.log(getType(null)); // "null"
console.log(getType({})); // "object"
```