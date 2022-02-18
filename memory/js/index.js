console.log('frontend200tb memory start');


/*****************
Константы
*****************/
const btn = document.querySelector('.btn');

const winner = document.querySelector('.js-winner');
const playground = document.querySelector('.playground');
const main_template = document.querySelector('.js-main-template').innerHTML;
const item_template = document.querySelector('.js-item-template').innerHTML;
const records_template = document.querySelector('.js-records-template').innerHTML;

const timer_ts = document.querySelector('.js-ts');
const timer_min = document.querySelector('.js-min');
const timer_sec = document.querySelector('.js-sec');
const timer_milli = document.querySelector('.js-milli');
const type_select = document.querySelector(".js-type-select");

const records = document.querySelector('.js-records');

let start_timer;

let all_records = {};
let this_level = 1;

if (localStorage.getItem('polo_records')) {
    all_records = JSON.parse(localStorage.getItem('polo_records'));
}
if (localStorage.getItem('polo_this_level')) {
    this_level = localStorage.getItem('polo_this_level') * 1;
}

showRecords();
showLevels();

let last_chose_item,
    this_chose_item;

function recordsUpdate(){
    localStorage.setItem('polo_records', JSON.stringify( all_records ));
}
function levelUpdate(){
    localStorage.setItem('polo_this_level', this_level);
}

let isChecking = false;
function showItem(_this) {
    if (isChecking) return;
    
    this_chose_item = _this;

    if (hasClass(this_chose_item, 'show')) {
        return;
    }

    addClass(this_chose_item, 'show');

    if (last_chose_item) {
        isChecking = true;

        setTimeout(function() {
            if (last_chose_item.outerHTML !== this_chose_item.outerHTML) {
                removeClass(last_chose_item, 'show');
                removeClass(this_chose_item, 'show');
            }
            
            last_chose_item = null;
            isChecking = false;

        }, 300);
            checkAllItems();

        return;
    }
    last_chose_item = this_chose_item;
}

function checkAllItems() {
    let items = playground.querySelectorAll(".js-item");
    let showed_items = playground.querySelectorAll(".js-item.show");

    if (items.length == showed_items.length) {
        showWinnerWindow();
        gameFinished();
    }
}

function startGame() {
    let size = parseInt(type_select.value);

    if (!size) return false;

    let len = size * size;
    let width = (100 / size) + '%';

    let image = 0;
    let arr = [];

    for (let i = 0; i < len; i++){
        let tmp = item_template;
        arr.push(replaceTemplate(tmp, {
            'id' : image,
            'width' : width,
        }));

        if (i % 2 != 0) {
            image++;
        }
    }
    let html = sort(arr).join('');

    playground.innerHTML = replaceTemplate(main_template, {
        'items' : html,
        'game_size' : size,
    });

    gameStarted();
}

function gameStarted() {
    addClass(document.body, 'game-started');

    startTimer();
}

function gameFinished() {
    removeClass(document.body, 'game-started');

    saveRecord(timer_ts.innerHTML);
    openLevel();
    stopTimer();
}

function openLevel(){

    let this_option = type_select.querySelector("option[value='"+ type_select.value +"']");
    let next_option = this_option.nextElementSibling;


    if (next_option) {

        if ( next_option.hasAttribute('disabled') ) {
            console.log(next_option);
            next_option.removeAttribute('disabled');
            this_level += 1;
            levelUpdate();
            return true;
        }
    }
    return false;
}

function showLevels(){
    
    let all_options = type_select.querySelectorAll("option");

    for (let i = 0; i < this_level; i++){
        all_options[i].removeAttribute('disabled');
    }
}

function startTimer(){
    start_timer = new Date().getTime();

    updateTimer();
}

function updateTimer(){
    if (start_timer) {
        showTimer();
        setTimeout(function(){
            updateTimer();
        }, 10);
    }
}

function showTimer(){
    let ts = new Date().getTime() - start_timer;
    let t = new Date(ts);

    let min = getTime('min', ts);

    let sec = getTime('sec', ts);

    let milli = getTime('milli', ts);
    

    timer_ts.innerHTML = ts;
    timer_min.innerHTML = min;
    timer_sec.innerHTML = sec;
    timer_milli.innerHTML = milli;
}

function getTime(type, ts){
    let res = null;
    switch(type){
        case 'min':
        case 'minutes':
            res = ts / (1000 * 60);
            res = parseInt(res);
            res = (res < 10)? '0' + res : res;

            break;
        case 'sec':
        case 'secs':
        case 'seconds':
            res = ts % (1000 * 60);
            res = parseInt(res / 1000);
            res = (res < 10)? '0' + res : res;
            break;
        case 'milli':
        case 'milliseconds':
            res = ts % 1000;
            res = (res < 10)? '0' + res : res;
            res = (res >= 100)? res.toString()[0] + '' + res.toString()[1] : res;
            break;
    }

    return res;
}

function showRecords(){
    let html = '';

    for (let rec in all_records) {

        let tmp = records_template;
        html += replaceTemplate(tmp, {
            'type' : rec,
            'min' : getTime('min', all_records[rec]),
            'sec' : getTime('sec', all_records[rec]),
            'milli' : getTime('milli', all_records[rec]),
        });
    }
    records.innerHTML = html;
}

function stopTimer(){
    start_timer = null;
}

function sort(arr){
    let tmp = [];

    while (arr.length > 0) {
        tmp.push( arr.splice(getRandom(arr.length), 1) );
    }

    return tmp;
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function saveRecord(ts){
    if (!ts) return false;

    let type = type_select.value;
    let last_rec = all_records[type];


    if (last_rec) {
        if( (ts * 1) < (last_rec * 1) ) {
            all_records[type] = ts;
        }
    } else {
        all_records[type] = ts;
    }
    recordsUpdate();
    showRecords();
}

function hideWinnerWindow() {
    removeClass(winner, 'show');
}

function showWinnerWindow() {
    addClass(winner, 'show');
}


/**
* функция - шаблонизатор. 
*/
function replaceTemplate(replaceText, replaceObj, before = '%', after = '%'){
    for(let text in replaceObj){
        replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
    }
    return replaceText;
}

function addClass(elements, className){
    return editClass(elements, className, 'add');
}

function removeClass(elements, className){
    return editClass(elements, className, 'remove');
}

function hasClass(element, className){
    if (element.getAttribute('class').indexOf(className) === -1)
        return false;
    return true;
}

function toggleClass(elements, className){
    return editClass(elements, className, 'toggle');
}

function editClass(elements, className, type){
    type = type || 'toggle';
    
    if (elements && typeof elements != 'object') {
        return;
    }

    if  (!elements.length) {
        elements = [elements];
    }
    
    for ( let i = 0, len = elements.length; i < len; i++ ) {
        let element = elements[i];
        let classStr = element.getAttribute('class');
        let classList = [];
        if (classStr) {
            classList = classStr.split(' ');
        }
        
        
        let change = true;
        
        switch (type) {
            case 'add':
                if ( classList.indexOf(className) === -1 )
                    classList.push(className);
                break;
            case 'remove':
                if ( classList.indexOf(className) !== -1 )
                    classList.splice(classList.indexOf(className), 1);
                break;
            case 'toggle':
                if ( classList.indexOf(className) === -1 )
                    classList.push(className);
                else
                    classList.splice(classList.indexOf(className), 1);
                break;
            default:
                change = false;
        }
        
        if (change)
            element.setAttribute('class', classList.join(' '));
    }
    
    return elements;
}
/*****************
События
*****************/
btn.addEventListener('click', startGame);

console.log('frontend200tb memory finish');
