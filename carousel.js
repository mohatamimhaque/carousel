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
})(jQuery);




/*
1.add control button crtlBtn true.default true
2. for autometic change autochange:true.default true
3. set navigation status true for navigation visible.default false
    set navigation style vertical for vertically showing,set horizontal for horizontally show.
    set icon style circle for circle icon,set icon style rectangle for rectangle icons.

*/

