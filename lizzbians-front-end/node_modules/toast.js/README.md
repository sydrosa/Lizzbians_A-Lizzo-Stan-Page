# Toast.js

> A tiny plugin to display content message. Animation dependcies on [animate.css](https://github.com/daneden/animate.css).

## API

- **toast.info(options)**

- **toast.error(options)**

- **toast.sucess(options)**

## Options

#### **message**

> content infomation

#### **animateIn** && **animateOut**

> refers to [animate.css](https://github.com/daneden/animate.css), more animation support you can refer to [animate.css](https://github.com/daneden/animate.css) and extend this plugin. Default support such as:

  - **animateIn**
  - `shake`
  - `fadeIn`
  - `flipInX`
  - `fadeInUp`

  - **animateOut**
  - `flipOutX`
  - `fadeOutUp`
  - `fadeOutDown`


#### **duration**

> duration time, default 2000ms.

#### **callback**

> trigger custom `callback` when animation complete.


## Demo

```js

git clone https://github.com/FrendEr/toast.js.git
cd toast.js
open styles-demo.html

```
