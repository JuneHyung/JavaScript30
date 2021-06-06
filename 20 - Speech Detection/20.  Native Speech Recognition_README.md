# 20.  Native Speech Recognition

음성인식을 통해 화면에 출력 해보기.

<img src="./readme_images/resultScreen.gif" alt="결과화면"/>

**초기코드**

```javascript
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speech Detection</title>
</head>
<body>
    <div class="words" contenteditable>
    </div>
    <script>
        window.SpeechRecognition = window.SpeechRecongnition || window.webkitSpeechRecognition;
    </script>
</body>
    <style>
        html{
            font-size: 10px;
        }
        body{
            background: #ffc600;
            font-family: 'helvetica neue';
            font-weight: 200;
            font-size: 20px;
        }
        .words{
            max-width: 500px;
            margin:50px auto;
            background: #fff;
            border-radius: 5px;
            box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
            padding: 1rem 2rem 1rem 5rem;
            background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
            background-size: 100% 3rem;
            position: relative;
            line-height: 3rem;
        }
        
        p {
            margin: 0 0 3rem;
        }

        .words:before {
            content: '';
            position: absolute;
            width: 4px;
            top: 0;
            left: 30px;
            bottom: 0;
            border: 1px solid;
            border-color: transparent #efe4e4;
        }
    </style>
</html>
```



**초기화면**

<img src="./readme_images/startScreen.png" alt="초기화면"/>



### 새로 알게된 것

**SpeechRecognition**

Web Speech API의 음성 인식 인터페이스는 **인식 서비스를 위한 컨트롤러 인터페이스**이며, 이것은 또한 인식 서비스에서 보내는 **음성 인식 이벤트를 처리**한다.

**주의! 브라우저 호환성을 잘 확인하기.**

**참고 :**

https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition



**SpeechRecognition.interimResults**

음성 인식 인터페이스의 임시 결과 속성은 중간 결과를 반환해야 하는지(참) 여부를 제어합니다(거짓). 
중간 결과는 아직 최종이 아닌 결과입니다(예: 음성 인식 결과.isFinal 속성이 false입니다).

intervalResults의 기본값은 false입니다.

**참고 :**

https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults



### 과정

<strong>1. 음석인식을 위한 설정과 변수 생성</strong>

```javascript
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
```

window.SpeechRecognition을 브라우저에따라 webkit속성을 적용한다.

interResult는 중간결과를 반환하는지 여부를 제어함.



<strong>2. 음성을 브라우저에 표시</strong>

```javascript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e =>{
    console.log(e.results);
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    p.textContent = transcript;
    
    /*Finished에 있는 부분*/
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩'); 
    p.textContent = poopScript;
    if(transcript.includes('유니콘')){
        console.log('유니콘22');
    }
    if(e.results[0].isFinal){
        p = document.createElement('p');
        words.appendChild(p);
    }
    
});
```

음성인식 결과를 배열로 변환해 텍스트에 담고,  poop | poo등 비속어가 오면 💩로 표시함.

유니콘이란 말이 오면 콘솔에 유니콘22가 찍히게 함.

말이 끝나면 p에 한 문장으로 내용을 담아 말이 끝나면 새 문장이 다시 시작하게 된다.



<strong>3. 이벤트 실행</strong>

```javascript
recognition.addEventListener('end', recognition.start);
recognition.start();
```

