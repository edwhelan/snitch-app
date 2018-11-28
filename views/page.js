//Main page View

function page(content) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css" rel="stylesheet">
  <link href="../stylesheets/index.css" rel="stylesheet" type="text/css">
  <title>1-800-SNITCH</title>
</head>
<body>
  ${content}
  <script src="../scripts/index.js"></script>
</body>
</html>
  `
}

module.exports = page;