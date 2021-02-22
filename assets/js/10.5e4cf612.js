(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{368:function(e,t,a){"use strict";a.r(t);var o=a(42),s=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"api-migration-guide"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-migration-guide"}},[e._v("#")]),e._v(" API Migration Guide")]),e._v(" "),a("p",[e._v("A list things that have changed (as in, breaking change) from the RAMP2 API")]),e._v(" "),a("h2",{attrs:{id:"geom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#geom"}},[e._v("#")]),e._v(" GEOM")]),e._v(" "),a("ul",[a("li",[e._v("Geometries are no longer always in Lat-Long projection & co-ord values.")]),e._v(" "),a("li",[a("code",[e._v("SpatialReference")]),e._v(" is added and is a property of all geometry objects.")]),e._v(" "),a("li",[a("code",[e._v("XY")]),e._v(" class is removed, as it's main purpose was to shuttle values between Lat-Long and other projections.")]),e._v(" "),a("li",[a("code",[e._v("XYBounds")]),e._v(" class is now "),a("code",[e._v("Extent")]),e._v(", and shares the same base class as other geometries.")]),e._v(" "),a("li",[e._v("All geometry constructors have optional spatial reference parameter. Not providing it will default to Lat-Long. Note that co-ord inputs will not be projected, they will be assumed to be in Lat-Long already.")])])])}),[],!1,null,null,null);t.default=s.exports}}]);