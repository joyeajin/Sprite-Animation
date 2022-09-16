window.addEventListener('load', function () {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    //2d그래픽으로 지정하는 함수, 로드된 이미지를 캔버스에 출력
    canvas.width = '500';
    //canvas의 넓이
    canvas.height = '500';
    //canvas의 높이

    class Mandrake {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById('mandrake')

            this.spriteWidth = 256;
            this.spriteHeight = 256;
            //전체 이미지에서 애니메이션 나올 부분의 넓이, 높이

            // this.width = this.spriteWidth;
            // this.height = this.spriteHeight;
            // 이 부분은 굳이 이렇게 안해도 잘 작동 돼서 수정했음!!

            this.scale = 2;
            //이미지를 두배 크기로 띄우겠다는 뜻

            this.x = this.canvasWidth / 2 - this.spriteWidth * this.scale / 2;
            this.y = this.canvasHeight / 2 - this.spriteHeight * this.scale / 2;
            this.minFrame = 0;
            this.maxFrame = 355;

            // this.frame = 18;
            // this.frameX = 0;
            // this.frameY = 15;
            // 초기 설정때 썼던 값! 뒤로 가면 하드코딩 말고 움직이는 값으로 다시 지정됨
        }
        draw() {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * this.scale, this.spriteHeight * this.scale);
            // ctx.drawImage() : 캔버스에 이미지를 그리는 방법 , drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            // this.frameX * this.spriteWidth, this.frameY * this.spriteHeight : 이미지를 자를 위치 조정
            // this.spriteWidth, this.spriteHeight : 이미지 자를 크기 조정
            // this.x, this.y : 자른 이미지 배치할 위치
            // this.spriteWidth * this.scale, this.spriteHeight * this.scale : 자른 이미지의 크기 조정
        }
        update() {
            this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame
            // this.frame이 this.maxFrame(355) 보다 작으면 this.frame에 1을 더해주고, 그렇지 않다면(355보다 커지면) this.minFrame(0)이 돼라는 뜻

            this.frameX = this.frame % 18;
            // this.frame 을 18로 나눈 나머지값
            //콘솔 : this.frameX = 0,1,2,3,4,~~,17,0,1,2,~

            this.frameY = Math.floor(this.frame / 18);
            // this.frame 을 18로 나눈 값의 내림값(Math.floor)
            //콘솔 : this.frameY = 0이 18번, 1이 18번 , ~~~
        }
        setAnimation(newMinFrame, newMaxFrame) {
            this.minFrame = newMinFrame;
            this.maxFrame = newMaxFrame;
            this.frame = this.minFrame;
        }
    }

    const mandrake = new Mandrake(canvas.width, canvas.height);
    //console.log(mandrake);
    //-> Mandrake {canvasWidth: 500, canvasHeight: 500, image: img#mandrake, spriteWidth: 256, spriteHeight: 256, …}

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 0, 0, canvas.width, canvas.height 만큼 구멍을 뚫어준다(여기서는 canvas의 전체 영역!)
        //clearRect를 하지 않으면 잔상이 남게된다

        mandrake.draw();
        mandrake.update();

        requestAnimationFrame(animate);
        //requestAnimationFrame(반복할 함수)
        // - 백그라운드 동작 및 비활성화시 중지(성능 최적화)
        // - 최대 1ms(1/1000s)로 제한되며 1초에 60번 동작
        // - 다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참조 
    }
    animate();

    const all = document.getElementById('all');
    all.addEventListener('click', function () {
        mandrake.setAnimation(0, 355);
    })

    const stop = document.getElementById('stop');
    stop.addEventListener('click', function () {
        mandrake.setAnimation(356, 356);
    })

    const grow = document.getElementById('grow');
    grow.addEventListener('click', function () {
        mandrake.setAnimation(0, 75);
    })

    const wink = document.getElementById('wink');
    wink.addEventListener('click', function () {
        mandrake.setAnimation(76, 112);
    })

    const float = document.getElementById('float');
    float.addEventListener('click', function () {
        mandrake.setAnimation(113, 262);
    })

    const hide = document.getElementById('hide');
    hide.addEventListener('click', function () {
        mandrake.setAnimation(263, 355);
    })
})