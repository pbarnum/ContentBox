<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Content Box</title>
    <link rel="stylesheet" type="text/css" href="/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="/css/ContentBox.css" />
</head>

<body>
Some text
</body>

<script type="text/javascript" src="/js/ContentBox.js"></script>
<script>
    var box = new ContentBox({
        title: "This is a box!",
        width: 400,
        height: 300
    });
    console.log(box.getCurrent());
    box.create();
</script>

</html>