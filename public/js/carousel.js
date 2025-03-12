// Carousel.js
import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import * as TiIcons from "https://cdn.skypack.dev/react-icons/ti";

const MAX_VISIBILITY = 3;

const AchievementCard = function(props) {
  return React.createElement(
    "div",
    { className: "achievement-card" },
    React.createElement("h2", null, props.title),
    React.createElement("p", null, props.description)
  );
};

const Carousel = function(props) {
  const [active, setActive] = useState(2);
  const count = React.Children.count(props.children);

  return React.createElement(
    "div",
    { className: "carousel" },
    active > 0 &&
      React.createElement(
        "button",
        {
          className: "nav left",
          onClick: function() {
            setActive(function(i) {
              return i - 1;
            });
          }
        },
        React.createElement(TiIcons.TiChevronLeftOutline, null)
      ),
    React.Children.map(props.children, function(child, i) {
      return React.createElement(
        "div",
        {
          className: "card-container",
          style: {
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block"
          }
        },
        child
      );
    }),
    active < count - 1 &&
      React.createElement(
        "button",
        {
          className: "nav right",
          onClick: function() {
            setActive(function(i) {
              return i + 1;
            });
          }
        },
        React.createElement(TiIcons.TiChevronRightOutline, null)
      )
  );
};

const achievements = [
  {
    title: "Dolore eiusmod est.",
    description: "Laborum consequat exercitation est fugiat in.",
    imgSrc: "images/2.svg",
    altText: "Achievement 1"
  },
  {
    title: "Quis nulla.",
    description: "Lorem enim occaecat labore veniam cillum.",
    imgSrc: "images/4.svg",
    altText: "Achievement 2"
  },
  {
    title: "Labore ad.",
    description: "Duis labore eu dolor velit amet ea proident.",
    imgSrc: "images/8.svg",
    altText: "Achievement 3"
  }
  // Add more achievement objects as needed
];

const App = function() {
  return React.createElement(
    Carousel,
    null,
    achievements.map(function(item, i) {
      return React.createElement(AchievementCard, {
        key: i,
        title: item.title,
        description: item.description
      });
    })
  );
};

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("react-carousel")
);
