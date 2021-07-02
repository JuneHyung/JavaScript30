# 16. Mouse Move Shadow

마우스 이동에 따라 텍스트그림자 효과를 주어 움직이게 함.

<img src="./readme_images/resultScreen.gif"/>



초기코드

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mouse Shadow</title>
</head>
<body>
    <div class="hero">
        <h1 contenteditable>🔥WOAH!</h1>
    </div>

    <style>
        html{
            color:#000;
            font-family:sans-serif;
        }
        body{
            margin: 0;
        }
        .hero{
            min-height:100vh;
            display:flex;
            justify-content: center;
            align-items: center;
            color:#000;
        }
        h1{
            text-shadow: 10px 10px 0 rgba(0,0,0,1);
            font-size:100px;
        }
    </style>
    <script>

    </script>
</body>
</html>
```

초기화면

<img src="./readme_images/startScreen.png"/>

### 과정

<strong>1. 변수 선언</strong>

```javascript
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500; // 100px;
```

hero클래스, h1태그를 가져옴.
walk는 옴직이는 범위.



<strong>2. 그림자를 만드는 함수 생성 및 좌표값 기준 설정</strong>

```javascript
function shadow(e){
            // console.log(e);
            const {offsetWidth:width, offsetHeight: height} = hero;
            let {offsetX: x, offsetY: y} = e;
            // console.log(x, y);
    
    		// this는 <div class="hero">, target은 h1
            if(this !== e.target){
                x = x + e.target.offsetLeft;
                y = y + e.target.offsetTop;
            }
```



<strong>ES6 구조 할당</strong>

```javascript
const width = hero.offsetWidth;
const height = hero.offsetHeight;
```

위 두줄을

```javascript
const {offsetWidth:width, offsetHeight: height} = hero;
```

한 줄로 합칠 수 있다.

* offsetWidth, offsetHeight는 border등의 길이까지 포함한 넓이,높이이다.
* x,y에 마우스 위치를 담고, 
* 현재 마우스 위치가 hero클래스안의 h1태그에 있을때 참을 반환.



<strong>3. 마우스 이동시 글미자 위치, 색상 설정.</strong>

```javascript
const xWalk = Math.round((x / width * walk) - (walk / 2));
const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;
}
```

h1태그의 그림자를 설정해줌.



<strong>4. 함수 호출</strong>

```javascript
hero.addEventListener('mousemove', shadow);
```

마우스가 움직이면 shadow함수를 실행.