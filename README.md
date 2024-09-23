<h2 style="margin-top:2px;font-size: 24px;">Overview</h2>
<p>This documentation describes the jQuery carousel plugin that allows for creating an interactive carousel component. The carousel can display images or other content, with features such as automatic sliding, navigation controls, and thumbnails.</p>
<h2 style="margin-top:12px;font-size: 24px;">Features</h2>
<ul tyle="margin-top:4px;">
    <li><span>Automatic Change:</span> Configurable automatic cycling through carousel items.</li>
    <li><span>Navigation Controls:</span> Display navigation buttons to manually cycle through items.</li>
    <li><span>Thumbnail Gallery:</span> Optional thumbnail previews for easy item selection.</li>
    <li><span>Progress Bar:</span> Visual indication of the current position in the carousel.</li>
    <li><span>Progress Bar:</span> Adapts to the size of its container.    </li>
</ul>
<h1 style="margin-top:12px;font-size: 28px;">Usage</h1>
<h2 style="margin-top:4px;font-size: 24px;">Initialization</h2>
<p>To use the carousel plugin, you need to include jQuery and the plugin script in your HTML. Then, initialize the carousel on a selected element.</p>
    <pre>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="path/to/your/carousel.js"></script>
    <script src="path/to/your/carousel.css"></script>
  </pre>
    <script>
        $(document).ready(function() {
            $('#your-carousel-id').carousel({
                autoChange: true,
                ctrlBtn: true,
                navigation: {
                    visible: true,
                    style: 'horizontal',
                    iconStyle: 'circle'
                },
                thumbnail: true,
                progressBar: true
            });
        });
    </script>
<h2 style="margin-top:4px;font-size: 24px;">HTML Structure</h2>
<p>Make sure your HTML structure follows this format:</p>
   
     <div class="parent/yourClassName">
        <div class="child/yourClassName"><span>1</span><img src="image/istockphoto-186534154-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>2</span><img src="image/istockphoto-471926619-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>3</span><img src="image/istockphoto-495508534-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>4</span><img src="image/istockphoto-483076291-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>5</span><img src="image/istockphoto-501057465-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>6</span><img src="image/istockphoto-537361232-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>7</span><img src="image/istockphoto-584248074-612x612.jpg" alt=""></div>
        <div class="child/yourClassName"><span>8</span><img src="image/istockphoto-697613666-612x612.jpg" alt=""></div>
    </div> 
   

<h2 style="margin-top:4px;font-size: 24px;">Options</h2>
<p>The carousel plugin accepts the following options:</p>
<table style="width:100%; border-collapse:collapse; border:1px solid #ddd; text-align:left;">
    <thead>
      <tr>
        <th style="border:1px solid #ddd; padding:8px;">Option</th>
        <th style="border:1px solid #ddd; padding:8px;">Type</th>
        <th style="border:1px solid #ddd; padding:8px;">Default</th>
        <th style="border:1px solid #ddd; padding:8px;">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">ctrlBtn</td>
        <td style="border:1px solid #ddd; padding:8px;">Boolean</td>
        <td style="border:1px solid #ddd; padding:8px;">false</td>
        <td style="border:1px solid #ddd; padding:8px;">Show control buttons for manual navigation.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">autoChange</td>
        <td style="border:1px solid #ddd; padding:8px;">Boolean</td>
        <td style="border:1px solid #ddd; padding:8px;">false</td>
        <td style="border:1px solid #ddd; padding:8px;">Enable automatic cycling through items.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">navigation</td>
        <td style="border:1px solid #ddd; padding:8px;">Object</td>
        <td style="border:1px solid #ddd; padding:8px;">{visible: false, style: 'horizontal', iconStyle: 'circle'}</td>
        <td style="border:1px solid #ddd; padding:8px;">Configuration for navigation visibility and style.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">thumbnail</td>
        <td style="border:1px solid #ddd; padding:8px;">Boolean</td>
        <td style="border:1px solid #ddd; padding:8px;">false</td>
        <td style="border:1px solid #ddd; padding:8px;">Show thumbnail gallery for items.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">progressBar</td>
        <td style="border:1px solid #ddd; padding:8px;">Boolean</td>
        <td style="border:1px solid #ddd; padding:8px;">false</td>
        <td style="border:1px solid #ddd; padding:8px;">Show a progress bar indicating the current item position.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">layout</td>
        <td style="border:1px solid #ddd; padding:8px;">String</td>
        <td style="border:1px solid #ddd; padding:8px;">horizontal</td>
        <td style="border:1px solid #ddd; padding:8px;">CSS class for custom layout.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">repeated</td>
        <td style="border:1px solid #ddd; padding:8px;">Boolean</td>
        <td style="border:1px solid #ddd; padding:8px;">false</td>
        <td style="border:1px solid #ddd; padding:8px;">Allow cycling back to the first item after the last item.</td>
      </tr>
    </tbody>
  </table>  
<h2 style="margin-top:4px;font-size: 24px;">Dependencies</h2>
<ul>
    <li>jQuery: This plugin requires jQuery.</li>
</ul>
<h2 style="margin-top:4px;font-size: 24px;">Contributing</h2>
<p>If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.</p>
