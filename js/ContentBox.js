/**
 * Content Box
 * Written by Patrick Barnum
 * 
 * Creates manipulative pop up boxes.
 *
 */

// Use strict JavaScript standards
;"use strict";

/**
 * Helper function for creating DOM elements
 */
function createElement(type, properties)
{
    if(typeof type !== 'string')
        return console.error('Could not create an element of type '+ type);
    
    var element = document.createElement(type);
    
    if(typeof properties !== 'undefined')
    {
        for(var prop in properties)
        {
            if(properties[prop].constructor === Array)
                properties[prop] = properties[prop].join(';');
            element.setAttribute(prop, properties[prop]);
        }
    }
    
    return element;
}

/**
 * Helper function for clearing an element's dataset
 */
function clearDataset(element)
{
    if(typeof element.dataset !== 'object')
        return false;
    
    for(prop in element.dataset)
    {
        delete element.dataset[prop];
    }
}


function ContentBox(options)
{
    var existingBoxes = document.getElementsByClassName('cBox-container');
    var self = this;
    this.undefined;
    
    options = options || {};
    options.movable = options.movable || true;
    options.scalable = options.scalable || true;
    options.buttons = options.buttons || {};
    options.height = options.height || 480;
    options.width = options.width || 680;
    
    this.box = createElement('div', {
        id: 'contentBox-'+ existingBoxes.length,
        class: 'cBox-container',
        style: [
            'z-index:'+ (10000 + existingBoxes.length),
            'height:'+ options.height +'px',
            'width:'+ options.width +'px',
            'top:'+ ((window.innerHeight / 2) - (options.height / 2)) +'px',
            'left:'+ ((window.innerWidth / 2) - (options.width / 2)) +'px'
        ]
    });
    
    var titleBar = createElement('div', {
        id: 'cBox-titleBar-' + existingBoxes.length,
        class: 'cBox-titleBar'
    });
    titleBar.innerHTML = '<span class="cBox-title">'+ options.title +'</span>';
    
    //if(options.scalable)
    //{
    //    
    //}
    
    var onDown = {};
    var onMove = {};
    var onUp = {};
    if(options.movable)
    {
        onDown = function(e)
        {
            var box = titleBar.parentNode;
            
            titleBar.dataset.zIndex = box.style.zIndex;
            titleBar.dataset.diffTop = titleBar.parentNode.offsetTop - e.clientY;
            titleBar.dataset.diffLeft = titleBar.parentNode.offsetLeft - e.clientX;
            titleBar.dataset.active = 'true';
            box.style.zIndex = 20000;
            
            // Prevent selection when dragging
            if(e.stopPropagation) e.stopPropagation();
            if(e.preventDefault) e.preventDefault();
            e.cancelBubble=true;
            e.returnValue=false;
            return false;
        };
        
        onMove = function(e)
        {
            if(titleBar.dataset.active !== 'true')
                return 0;
            
            var box = titleBar.parentNode;
            var boxTop = box.offsetTop;
            var boxLeft = box.offsetLeft;
            var boxBottom = box.offsetTop + box.offsetHeight;
            var boxRight = box.offsetLeft + box.offsetWidth;
            
            var finalTop = e.clientY + Number(titleBar.dataset.diffTop);
            var finalLeft = e.clientX + Number(titleBar.dataset.diffLeft);
            
            if(finalTop < 0)
                finalTop = 0;
            if(finalTop + box.offsetHeight > window.innerHeight)
                finalTop = window.innerHeight - box.offsetHeight;
            if(finalLeft < 0)
                finalLeft = 0;
            if(finalLeft + box.offsetWidth > window.innerWidth)
                finalLeft = window.innerWidth - box.offsetWidth;
            
            box.style.top = finalTop +'px';
            box.style.left = finalLeft +'px';
        }
        
        onUp = function(e)
        {
            var box = titleBar.parentNode;
            box.style.zIndex = Number(titleBar.dataset.zIndex);
            clearDataset(titleBar);
        }
        
    }
    
    titleBar.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    
    this.box.appendChild(titleBar);
    
    var closeButton = createElement('a', {
        class: 'cBox-button cBox-close',
        href: 'javascript:void(0);'
    });
    
    closeButton.addEventListener('click', function(e){self.close();}, false);
    closeButton.innerHTML = 'Close';
    
    var actionBar = createElement('div', {
        class: 'cBox-actionBar'
    });
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.appendChild(closeButton);
    ul.appendChild(li);
    
    for(button in options.buttons)
    {
        var b = options.buttons[button];
        b.href = b.href || 'javascript:void(0);';
        var li = document.createElement('li');
        var tmpClass = '';
        if(b['class'] != this.undefined)
        {
            if(b['class'].constructor === Array)
                b['class'] = b['class'].join(' ');
            tmpClass = ' '+ b['class'];
        }
        
        var a = createElement('a', {
            class: 'cBox-button' + tmpClass,
            href: b.href,
        });
        a.innerHTML = b.text;
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    actionBar.appendChild(ul);
    this.box.appendChild(actionBar);
    
    document.body.appendChild(this.box);
}

ContentBox.prototype.close = function()
{
    this.box.parentNode.removeChild(this.box);
}

var hi = new ContentBox();




