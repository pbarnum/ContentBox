<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Content Box</title>
    
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="/css/styles.css" />
    <link rel="stylesheet" type="text/css" href="/css/ContentBox.css" />
</head>

<body>
    <div class="titleBar">
        <h1 class="mainTitle">Content Box</h1>
        <h2 class="subTitle">Made with pure JavaScript</h2>
        <div class="download"><a href="/files/ContentBox.zip" download>Click to download</a></div>
    </div>
    <div class="br"></div>

    <div class="content">
        <h1 class="title">Welcome</h1>
        <p>
            Thank you for taking an interest in the Content Box! Here you will find examples and tips to help
            you use the plug-in efficiently.
        </p>
        
        <div class="br"></div>
        
        <h1 class="title">Examples</h1>
        <table class="mainTable">
            <tbody>
                <!-- EXAMPLE: Initialization -->
                <tr>
                    <td>
                        <p>
                            <div class="title">Initialization</div>
                            The Content Box is set to control multiple boxes at once. Boxes could even be spawned
                            by another and while tying the child to its parent. Allowing the functionality calls
                            for setting up one single instance of the object, therefore the ContentBox() constructor
                            should only be used once.
                        </p>
                    </td>
                    <td>
                        <div class="code">
                            <div class="language">JavaScript <button class="runButton" onclick="initCBox();">Run Code</button></div>
                            <div class="snippet" onclick="copyCode(this);" title="Click snippet to copy to the clipboard">
                                var cboxManager = new ContentBox();
                            </div>
                        </div>
                    </td>
                </tr>
                
                <!-- EXAMPLE: Create -->
                <tr>
                    <td>
                        <p>
                            <div class="title">Creating New Boxes</div>
                            Creating a new box requires the <span class="snippet">create()</span> public method.
                        </p>
                    </td>
                    <td>
                        <div class="code">
                            <div class="language">JavaScript <button class="runButton" onclick="createDefault();">Run Code</button></div>
                            <div class="snippet" onclick="copyCode(this);" title="Click snippet to copy to the clipboard">
                                cboxManager.create();
                            </div>
                        </div>
                    </td>
                </tr>
                
                <!-- EXAMPLE: Box Options -->
                <tr>
                    <td class="pad" colspan="2">
                        <p>
                            <div class="title">Customizing Boxes</div>
                            The <span class="snippet">create()</span> method will accept one argument of type <span class="snippet">Object</span>.
                            Listed below are all the options available to you...
                        </p>
                    </td>
                </tr>
                <tr>
                    <td class="pad" colspan="2">
                        <p>
                            <table class="optionTable">
                                <tbody>
                                    <tr><td><span class="snippet">int</span> parent</td><td>Sets the parent Box for the new Box.</td></tr>
                                    <tr><td><span class="snippet">bool</span> isMovable</td><td>Allows the Box to move within the window. The title bar is used to move the Box.</td></tr>
                                    <tr><td><span class="snippet">bool</span> isScalable</td><td>Allows the Box to scale. A div element will be appended to the Box for its control.</td></tr>
                                    <tr><td><span class="snippet">object</span> buttons</td><td>Reads a key:value object where the key represents the button text and the value its function.</td></tr>
                                    <tr><td><span class="snippet">int</span> height</td><td>The height of the Box.</td></tr>
                                    <tr><td><span class="snippet">int</span> width</td><td>The width of the Box.</td></tr>
                                    <tr><td><span class="snippet">string</span> title</td><td>The title of the Box.</td></tr>
                                    <tr><td><span class="snippet">mixed</span> body</td><td>The body can be represented as a function, or string.</td></tr>
                                    <tr><td><span class="snippet">function</span> beforeCreate</td><td>Callback function returning one argument: array existingBoxes.</td></tr>
                                    <tr><td><span class="snippet">function</span> afterCreate</td><td>Callback function returning one argument: object newBox.</td></tr>
                                    <tr><td><span class="snippet">function</span> beforeClose</td><td>Callback function returning one argument: object currentBox.</td></tr>
                                </tbody>
                            </table>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</body>

<script type="text/javascript" src="/js/ContentBox.js"></script>
<script>
var cboxManager = new ContentBox();
document.addEventListener('click', function(e)
{
    document.activeElement.blur();
});

function copyCode(el)
{
    if(document.selection)
    {
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    else if(window.getSelection)
    {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
    }
    
    document.execCommand("RemoveFormat");
    document.execCommand("Copy");
}

function initCBox()
{
    if(!cboxManager.created)
        cboxManager.create({
            movable: false,
            scalable: false,
            width: 300,
            height: 150,
            title: 'Hey!',
            body: 'You\'ve already created the Content Box object, so there is no need for another one!'
        });
}

function createDefault()
{
    cboxManager.create();
}
</script>

</html>