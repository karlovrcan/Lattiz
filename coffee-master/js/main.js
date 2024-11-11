$(document).ready(function () {
  "use strict";

  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = $("#header").outerHeight();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({ class: "", id: "" });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function () {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function () {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  // Function to open a specific modal
  function openModal(title, description, imageUrl, features, modalId) {
    $(modalId).find("#modalTitle").text(title);
    $(modalId).find("#modalImage").attr("src", imageUrl);
    $(modalId).find("#modalDescription").html(description);
    $(modalId).fadeIn();
  }

  // Event handler for clicking on the discover button
  $(".product-card .discover-button").on("click", function (event) {
    event.preventDefault();
    const productCard = $(this).closest(".product-card");
    const title = productCard.data("title");
    const description = productCard.data("description");
    const imageUrl = productCard.attr("data-modal-image");
    const features = productCard.data("features");

    // Decide which modal to open based on the data attributes
    let modalId;
    if (title === "Lattiz® Inside") {
      modalId = "#lattizInsideModal";
    } else if (title === "Lattiz® 4L Milk Pack") {
      modalId = "#lattizMilkModal";
    } else {
      modalId = "#productModal"; // default modal
    }

    openModal(title, description, imageUrl, features, modalId);
  });

  // Close modal when the close button is clicked
  $(".close-button").on("click", function () {
    $(this).closest(".modal").fadeOut();
  });

  // Close modal if user clicks outside of the modal content
  $(window).on("click", function (event) {
    if ($(event.target).is(".modal")) {
      $(".modal").fadeOut();
    }
  });
});
