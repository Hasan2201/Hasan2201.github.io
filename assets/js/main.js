"use strict";


jQuery(document).ready(function ($) {

    jQuery(window).load(function () {
        jQuery(".loaded").fadeOut();
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    jQuery('.navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    jQuery(".main-nav").localScroll();

//    $(".button-collapse").sideNav();

//    $('.button-collapse').sideNav('show');
    $('.body').scrollSpy();
    $('.button-collapse').sideNav({
        menuWidth: 250, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
    );

    jQuery(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 255,
        constrain_width: false,
        hover: true,
        gutter: 0,
        belowOrigin: false,
        alignment: 'right'
    });


    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $('').localScroll();

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();




// scroll Up

    jQuery(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    jQuery('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


    jQuery('.gallery-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
    });

    jQuery('.gallery-video').magnificPopup({
        type: 'iframe',
    });


    /*---------------------------------------------*
     * Menu Section
     ---------------------------------------------*/

    $('.cd-menu-trigger').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').addClass('move-out');
        $('#main-nav').addClass('is-visible');
        $('.cd-shadow-layer').addClass('is-visible');
    });
    //close menu
    $('.cd-close-menu').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
    });

    //clipped image - blur effect
    set_clip_property();
    $(window).on('resize', function () {
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
                $window_height = $(window).height(),
                $header_top = $window_height - $header_height,
                $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect(' + $header_top + 'px, ' + $window_width + 'px, ' + $window_height + 'px, 0px)');
    }
    $('#main-nav a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
        $('body,html').animate(
                {'scrollTop': target.offset().top},
                900
                );
    });


    //End
});




jQuery(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("header").addClass("small");
    } else {
        $("header").removeClass("small");
    }
});

jQuery(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});


function setup(){
    createCanvas(800,800);
}
let alienX=[0,2.5,5,7.5];
let alien=[true,true,true,true];
let alienY=2;
let alienSpeed=1;
let pauseBreak=0;
let falling =false;
let gameState=[false,true,false,false]
let shooting=false;
let x=300;
let difficultyBuff=1;
let y=700;

let shotX=1;
function draw(){
    if(gameState[0]===true){
        background(225);
        textSize(200);
        text("SPACE INVADERS", 400, 400);
    }
    if(gameState[1]===true){
    shotX =x+50;
    background(0);
    if(alien[0]===true){
        aliens(alienX[0],alienY);
    }
    if(alien[1]===true){
        aliens(alienX[1],alienY);
    }
    if(alien[2]===true){
        aliens(alienX[2],alienY);
    }
    if(alien[3]===true){
        aliens(alienX[3],alienY);
    }
    ship(x);
    
    if (keyIsDown(UP_ARROW)&&shooting===false){
        y=700;
        shooting=true;

    }
    if (keyIsDown(LEFT_ARROW)){
        x-=5;    
    }
    if (keyIsDown(RIGHT_ARROW)){
        x +=5;
    }
    shot(shotX,y);
    
    alienMove();
    y-=25;
    
    Collision();
    losing();
    winning();
}

if(gameState[2]===true){
   background(0); 
   textSize(25);   
   text('Game Over',375, 400);
}
if(gameState[3]===true){
    background(225); 
    textSize(25);   
    text('YOU WIN', 375, 400);
}
}
function shot(x,y){
    if(shooting===true){
        ellipse(x,y,10,80);
       
    }
    if(y<alienY+50){
        shooting=false;
    }
}
function aliens(x,y){
    fill('green');
    rect(x*50,y*50,100,100);
}
function alienMove(){
    pauseBreak+=1;
  
    if(pauseBreak===35){
        alienX[0]+=alienSpeed;
        alienX[1]+=alienSpeed;
        alienX[2]+=alienSpeed;
        alienX[3]+=alienSpeed;
        pauseBreak=0;
    }
    if(alienX[3]+1.5>16){
        falling=true;
        down();
        alienX=[0,2.5,5,7.5];

    }
}
function down(){
    if(falling===true){
        alienY+=1;
        falling=false;
    }
}
function winning(){
    if(alien[0]===false&&alien[1]===false&&alien[2]===false&&alien[3]===false){
        gameState[1]=false;
        gameState[3]=true;
    }
}
function losing(){
    if(alienY>12){
        gameState[1]=false;
        gameState[2]=true;
    }
}
function Collision(){
    if(dist(alienX[0]*50+50,alienY+50,shotX,y)<50){
        alien[0]=false;
        shooting=false;
    }
    if(dist(alienX[1]*50+50,alienY+50,shotX,y)<50){
        alien[1]=false;
        shooting=false;
    }
    if(dist(alienX[2]*50+50,alienY+50,shotX,y)<50){
        alien[2]=false;
        shooting=false;
    }
    if(dist(alienX[3]*50+50,alienY+50,shotX,y)<50){
        alien[3]=false;
        shooting=false;
    }
}

function ship (x){
    fill('red');
    rect(x,700,100,700);
}



var d = new Date();
var n = d.toLocaleString();
document.getElementById("demo").innerHTML = n;
