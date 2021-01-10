//Cards value store img sources
let cards = ["img/1.png","img/1.png","img/2.png","img/2.png","img/3.png","img/3.png","img/4.png","img/4.png","img/5.png","img/5.png","img/6.png","img/6.png","img/7.png","img/7.png","img/8.png","img/8.png"];

//img cliked..flipped..as img objects
let memory_cards=[];

//img cliked..flipped..as img source value 
let memory_values = [];


let moves=0;//numbers of moves
let stars=3;// numbers of stars
var stars_draw=$(".fa-star");//stars objects

let flipped_no = 0;//number of flipped card to check game finish

//for timer
let secs=0; //for seconds
let mins=0; //for minutes

let seconds='';
let minutes='';
var t_started=false;// check timer started or not 
let time;



//to shuffle the array 
Array.prototype.memory_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}



// creat a new game
function new_game(){
    t_started=false;
    secs=0;
    mins=0;
    clearInterval(time);
    
    seconds='00';
    minutes='00';
    $(".sec").text(seconds);
    $(".min").text(minutes);
    stars=3;//reset stars
    moves=0;// reset moves
    stars_draw.css("color","#FFD700");//reset stars on board
    $(".move").text(moves+" Moves");//reset moves on board
    $(".board").html("");//clear board
    flipped_no = 0;
    // creat new board
    var output = '';
    cards.memory_shuffle();
    for(var i = 0; i < cards.length; i++){
		output += '<div class="card"><img class="hid" src="' + cards[i] + '"></div>';
	}
    $('.board').append(output);
    $(".card").on("click",card_flip);
}

//check card flip when cliked
function card_flip(){
    var img=$(this).children();// the clicked img
    if((img.hasClass("hid")) && memory_values.length < 2)
       {
           if(!t_started)
               {
                   time = setInterval(timer,1000);
                   t_started=true;
               }
           $(this).addClass("flipped");
           img.removeClass("hid");

           if(memory_values.length==0)
            {
                  memory_values.push(img.attr("src"));
                  memory_cards.push(img);
            }
           
           else if(memory_values.length==1)
            {
                memory_values.push(img.attr("src"));
                memory_cards.push(img);
                
                if(memory_values[0]==memory_values[1])
                    {
                        flipped_no +=2;
                        memory_values=[];
                        memory_cards=[];
                        //check game ended
                        if(flipped_no == cards.length){
                            clearInterval(time);
                             r=confirm("Congratulations...You Win \n You get "+stars+"stars \n Taking "+mins+" minutes & "+secs+" Seconds \n Do You Want to Play a New Game");
                            if(r)
                                {
                                  new_game();  
                                }
				        }
                        
                    }else{
                        setTimeout(flip_back, 1000);
                    }
                
            }                
           
       }
        
}

//flip cards back if it are different
function flip_back(){
    memory_cards[0].addClass("hid");
    memory_cards[1].addClass("hid");
    memory_cards[0].parent().removeClass("flipped");
    memory_cards[1].parent().removeClass("flipped");
    memory_values=[];
    memory_cards=[];
    
    moves++;
    $(".move").text(moves+" Moves")
    set_stars(moves);
    console.log(stars);
}

//set stars on board 
function set_stars(m){
    
    if(m ==10)
        {
            stars--;
            $("#s3").css("color","#b0bec5")
        }
    
    if(m ==15)
        {
            stars--;
            $("#s2").css("color","#b0bec5")
        }
}

function timer(){
    
        secs++;
        if(secs==60)
            {
                mins++;
                secs=0;
            }
        if(secs<10)
            {
                seconds='0'+secs;
            }else
                {
                    seconds=secs;
                }
        if(mins<10)
            {
                minutes='0'+mins;
            }else
                {
                    minutes=mins;
                }
        
        $(".sec").text(seconds);
        $(".min").text(minutes);

}

new_game();


