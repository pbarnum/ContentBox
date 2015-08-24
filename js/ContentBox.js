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
    // Singleton -- Only keep one instance of this method
    var instance;
    ContentBox = function() {
        return instance;
    };
    
    ContentBox.prototype = this;
    instance = new ContentBox();
    instance.constructor = ContentBox;
    
    // Initialize global variables
    var self = this;
    this.undefined;
    this.CLASSES = {
        CONTAINER:  'cBox-container',
        TITLE_BAR:  'cBox-titleBar',
        TITLE:      'cBox-title',
        BUTTON:     'cBox-button',
        CLOSE:      'cBox-close',
        RESIZE:     'cBox-resize',
        ACTION_BAR: 'cBox-actionBar'
    };
    
    // Make sure options is an object
    options = options || {};
    this.create(options);
    
    return instance;
}

ContentBox.prototype.create = function(options)
{
    // Grab all existing boxes and include them into this object
    var existingBoxes = document.getElementsByClassName('cBox-container');
    
    options.movable = options.movable || true;
    options.scalable = options.scalable || true;
    options.buttons = options.buttons || {};
    options.height = options.height || 480;
    options.width = options.width || 680;
    
    this.box = createElement('div', {
        id: 'cBox-'+ existingBoxes.length,
        class: this.CLASSES.CONTAINER,
        style: [
            'z-index:'+ (10000 + existingBoxes.length),
            'height:'+ options.height +'px',
            'width:'+ options.width +'px',
            'top:'+ ((window.innerHeight / 2) - (options.height / 2)) +'px',
            'left:'+ ((window.innerWidth / 2) - (options.width / 2)) +'px'
        ]
    });
    
    var titleBar = createElement('div', {
        id: this.CLASSES.TITLE_BAR + '-' + existingBoxes.length,
        class: this.CLASSES.TITLE_BAR
    });
    titleBar.innerHTML = '<span class="' + this.CLASSES.TITLE + '">'+ options.title +'</span>';
    
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
            e.cancelBubble = true;
            e.returnValue = false;
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
        class: this.CLASSES.BUTTON + ' ' + this.CLASSES.CLOSE,
        href: 'javascript:void(0);'
    });
    
    closeButton.addEventListener('click', function(e){self.close();}, false);
    closeButton.innerHTML = 'Close';
    
    var actionBar = createElement('div', {
        class: this.CLASSES.ACTION_BAR
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
            class: this.CLASSES.BUTTON + tmpClass,
            href: b.href,
        });
        a.innerHTML = b.text;
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    actionBar.appendChild(ul);
    this.box.appendChild(actionBar);
    
    if(options.scalable)
    {
        // Create draggable corner object
        var resize = createElement('div', {
            id: this.CLASSES.RESIZE + '-' + existingBoxes.length,
            class: this.CLASSES.RESIZE
        });
        
        window.addEventListener('mousedown', function(e)
        {
            
        });
        
        this.box.appendChild(resize);
    }
    
    document.body.appendChild(this.box);
}

ContentBox.prototype.close = function()
{
    this.box.parentNode.removeChild(this.box);
}
