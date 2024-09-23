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

    
    <script>
    (function($) {
    $.fn.carousel = function(options) {
        var settings = $.extend({
            ctrlBtn: false,
            autoChange: false,
            navigation: {
                visible: false,
                style: 'horizontal',
                iconStyle: 'circle'
            },
        }, options);
        var linkElement = $('<link>', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        });

        $('head').append(linkElement);


        return this.each(function() {
            var $div = $(this);
            $div.addClass(`carousel ${settings.layout}`);
            var $child = $div.children();
            $child.addClass('carousel-item');
            $child.first().addClass('showing');
            $child.css('--mh', $child.first().width() + 'px');
            $child.css('--mv', $child.first().height() + 'px');
            var vh = $child.first().height();
            var vw = $child.first().width();
            var intervalId;
            var pos = 1;
            var progressBar;

            if (settings.thumbnail) {
                settings.navigation.visible = false;
                settings.ctrlBtn = false;
                $div.height($div.height() + 90);
                $child.css('height', `${vh}px`);
                $div.append(`<div class="thumGallary" style="--vh:${vh}px;--vw:${vw}px">
                            <div class="thumWrapper">
                                <button class="previous"><span class="material-icons">chevron_left</span></button>
                                <div class="gallary-container">
                                    <div class="img-container">
                                        
                                    </div>
                                </div>
                                <button class="next"><span class="material-icons">chevron_right</span></button>
                            </div>
                        </div>`);
                for (let i = 0; i < $child.length; i++) {
                    let src = $($child[i]).find('img').attr('src');
                    $div.find('.img-container').append(`
                        <div class="thumItem" data-location=${i}>
                           <div class="overlay"></div>
                            <div class="img">
                                <img src="${src}" alt="">
                            </div>
                        </div>
                        `);
                }
                $div.find('.thumItem:first-child()').addClass('active');


                $div.find(".thumGallary .previous").click(function() {
                    previous();
                });
                $div.find(".thumGallary .next").click(function() {
                    nextA();
                    if (settings.autoChange) {
                        clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            nextA();
                        }, 5000);
                    }
                });
                $div.find(".thumGallary .thumItem").click(function() {
                    if (settings.autoChange) {
                        clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            nextA();
                        }, 5000);
                    }
                    let pp = parseInt($(this).attr('data-location')) + 1;
                    if (pp < pos) {
                        $child.addClass('right').removeClass('left');
                    } else if (pp > pos) {
                        $child.removeClass('right').addClass('left');
                    }
                    if (pp != pos) {
                        pos = pp
                        $div.find('.navigationDiv .nav-item.visible').removeClass('visible');
                        $(this).addClass('visible');
                        $div.find('.carousel-item.prev').removeClass('prev');
                        $div.find('.carousel-item.showing').addClass('prev');
                        $div.find('.carousel-item.showing').removeClass('showing');
                        $div.find(`.carousel-item:nth-child(${pos})`).addClass('showing');
                        $div.find('.thumItem').removeClass('active')
                        $div.find(`.thumItem:nth-child(${pos})`).addClass('active');
                        if (settings.progressBar) {
                            progressBar.css('--v', `${(vw/$child.length)*pos}px`);
                        }
                    }
                })



            }

            function nextA() {
                $child.addClass('left');
                $child.removeClass('right');
                setTimeout(() => {
                    $child.each(function() {
                        if ($(this).hasClass('showing')) {
                            if (settings.repeated == true || pos < $child.length) {
                                $div.find('.carousel-item.prev').removeClass('prev');
                                $div.find('.carousel-item.showing').addClass('prev');
                                $(this).removeClass('showing');
                                var $nextItem = $(this).next('.carousel-item');
                                if ($nextItem.length) {
                                    $nextItem.addClass('showing');
                                } else {
                                    $child.first().addClass('showing');
                                }
                                pos = $child.index($('.carousel-item.showing')) + 1;
                                if (settings.navigation.visible) {
                                    navActive();
                                }
                                if (settings.thumbnail) {
                                    $div.find('.thumItem').removeClass('active')
                                    $div.find(`.thumItem:nth-child(${pos})`).addClass('active');

                                    var scrollPosition = (pos - 1) * 92;
                                    $div.find('.img-container').animate({
                                        scrollLeft: scrollPosition
                                    }, 600);

                                }
                                if (settings.progressBar) {
                                    progressBar.css('--v', `${(vw/$child.length)*pos}px`);
                                }
                            }
                            return false;
                        }

                    });


                }, 100);
            }

            function previous() {
                $child.addClass(' right');
                $child.removeClass('left');

                if (settings.autoChange) {
                    clearInterval(intervalId);
                    intervalId = setInterval(() => {
                        nextA();
                    }, 5000);
                }


                setTimeout(() => {
                    $child.each(function() {
                        if ($(this).hasClass('showing')) {
                            if (settings.repeated == true || pos > 1) {
                                $div.find('.carousel-item.prev').removeClass('prev');
                                $div.find('.carousel-item.showing').addClass('prev');

                                $(this).removeClass('showing');
                                var $nextItem = $(this).prev('.carousel-item');

                                if ($nextItem.length) {
                                    $nextItem.addClass('showing');
                                } else {
                                    $child.last().addClass('showing');
                                }
                                pos = $child.index($('.carousel-item.showing')) + 1;
                                if (settings.thumbnail) {
                                    $div.find('.thumItem').removeClass('active')
                                    $div.find(`.thumItem:nth-child(${pos})`).addClass('active');

                                    var scrollPosition = (pos - 1) * 92;
                                    $div.find('.img-container').animate({
                                        scrollLeft: scrollPosition
                                    }, 600);

                                }
                                if (settings.navigation.visible) {
                                    navActive();
                                }
                                if (settings.progressBar) {
                                    progressBar.css('--v', `${(vw/$child.length)*pos}px`);
                                }
                                return false;
                            }
                        }
                    });
                }, 100);
            }

            function navActive() {
                $div.find('.navigationDiv .nav-item.visible').removeClass('visible');
                $div.find(`.navigationDiv .nav-item:nth-child(${$child.index($('.carousel-item.showing'))+1})`).addClass('visible');

            }
            if (settings.navigation.visible) {
                var pp = 0;
                var $navigationDiv = $(`<div class="navigationDiv ${settings.navigation.style}"></div>`);
                for (var i = 0; i < $child.length; i++) {
                    var $button = $(`<button class="nav-item ${settings.navigation.iconStyle}" value="${i+1}"><span></span></button>`);
                    $navigationDiv.append($button);
                }
                $div.append($navigationDiv);

                $div.find(`.navigationDiv .nav-item:first-child()`).addClass('visible');
                $div.find('.navigationDiv .nav-item').click(function() {
                    if (settings.autoChange) {
                        clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            nextA();
                        }, 5000);
                    }
                    let val = $(this).val();
                    if (pp > val) {
                        $child.addClass(' right').removeClass('left');
                    } else if (pp < val) {
                        $child.removeClass(' right').addClass('left');
                    }
                    pp = val;
                    $div.find('.navigationDiv .nav-item.visible').removeClass('visible');
                    $(this).addClass('visible');
                    $div.find('.carousel-item.prev').removeClass('prev');
                    $div.find('.carousel-item.showing').addClass('prev');
                    $div.find('.carousel-item.showing').removeClass('showing');
                    $div.find(`.carousel-item:nth-child(${val})`).addClass('showing');
                });

            }
            if (settings.autoChange) {
                intervalId = setInterval(() => {
                    nextA();
                }, 5000);
            }
            if (settings.ctrlBtn) {
                var $prevButton = $('<button>', {
                    class: 'carousel-control-prev material-icons',
                    tabindex: -1,
                    role: 'button',
                    'aria-label': 'Previous',
                    text: 'arrow_back_ios_new',
                });

                var $nextButton = $('<div>', {
                    class: 'carousel-control-next material-icons',
                    tabindex: -1,
                    role: 'button',
                    'aria-label': 'Next',
                    text: 'arrow_back_ios_new',
                });
                $div.append($prevButton, $nextButton);




                $nextButton.click(function() {
                    nextA();
                    if (settings.autoChange) {
                        clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            nextA();
                        }, 5000);
                    }
                });



                $prevButton.click(function() {
                    previous();
                })

            }
            if (settings.progressBar) {
                progressBar = $('<div></div>').addClass('progressBar');
                progressBar.css('--vw', `${vw}px`);
                progressBar.css('--v', `${(vw/$child.length)*pos}px`);
                progressBar.css('--vh', `${vh}px`);
                $div.append(progressBar);
            }




        });
    };
    })(jQuery);</script>
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
<h2 style="margin-top:4px;font-size: 24px;">HTML Structure</h2>

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
