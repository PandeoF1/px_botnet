/* ----------------------------------------------------------------------------
    pusher.flatdb
    MIT License, Copyright (c) 2013 Pusher, Inc.
   -------------------------------------------------------------------------- */
/*
    Permission is hereby granted, free of charge, to any person obtaining a 
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation 
    the rights to use, copy, modify, merge, publish, distribute, sublicense, 
    and/or sell copies of the Software, and to permit persons to whom the 
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in 
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
   ----------------------------------------------------------------------------
*/

var nodeenv = require("pusher.nodeenv"),
    color   = require("../lib/pusher.color.js"),
    _       = require("underscore");

var suite = {};

// Merge in some standard tests
_.extend(suite, nodeenv.nodeunit.suite);

suite["Base"] =
{
    setUp : function(next)
    {
        this.R = color('rgb(255,0,0)');
        this.G = color('rgb(0,255,0)');
        this.B = color('rgb(0,0,255)');
        
        this.compareTableRGBA8 = function (table, test)
        {
            // Assume each row is composed of two elements:
            // 0: an array of arguments to pusher.color()
            // 1: an array of R, G, B, A values that should result
            //
            _.each(table, function (row)
            {
                var c = color.apply(null, row[0]).rgba8();
                for (var i = 0; i < 4; ++i)
                    test.strictEqual(c[i], row[1][i], "'" + row[0] + "' did not parse correctly");
            });
        };
        
        next();
    },

    "Basic RGB" : function (test)
    {
        test.equal(this.R.red(),      255);
        test.equal(this.R.green(),    0);
        test.equal(this.R.blue(),     0);
        
        test.equal(this.G.red(),      0);
        test.equal(this.G.green(),    255);
        test.equal(this.G.blue(),     0);
        
        test.equal(this.B.red(),      0);
        test.equal(this.B.green(),    0);
        test.equal(this.B.blue(),     255);
        test.done();
    },
    
    "Keywords" : function (test)
    {
         var table = {
            black: '#000000',
            silver: '#c0c0c0',
            gray: '#808080',
            white: '#ffffff',
            maroon: '#800000',
            red: '#ff0000',
            purple: '#800080',
            fuchsia: '#ff00ff',
            green: '#008000',
            lime: '#00ff00',
            olive: '#808000',
            yellow: '#ffff00',
            navy: '#000080',
            blue: '#0000ff',
            teal: '#008080',
            aqua: '#00ffff'
        };
        
        _.each(table, function (value, key) {
            test.strictEqual( color(key).hex6(), value, "Error parsing keyword: " + key);
        });
        test.done();
    },
    
    "Color Formats" : function (test)
    {
        var table = [
            ['red', this.R],
            ['#F00', this.R],
            ['#FF0000', this.R],
            ['rgb(255,0,0)', this.R],
            ['rgba(255,0,0,1)', this.R],
            ['hsl(0,100,50)', this.R],
            ['hsla(0,100,50,1)', this.R],
            ['hsv(0,100,100)', this.R],
            ['hsva(0,100,100,1)', this.R],
            ['rgb8(255,0,0)', this.R],
            ['rgba8(255,0,0,255)', this.R],
            ['float3(1,0,0)', this.R],
            ['float4(1,0,0,1)', this.R],
            ['packed_rgba(4278190335)', this.R],
            ['packed_rgba(0xFF0000FF)', this.R],
            ['packed_argb(4294901760)', this.R],
            ['packed_argb(0xFFFF0000)', this.R],

            ['lime', this.G],   // #00FF00 is "lime" not "green" in CSS color keywords
            ['#0F0', this.G],
            ['#00FF00', this.G],
            ['rgb(0,255,0)', this.G],
            ['rgba(0,255,0,1)', this.G],
            ['hsl(120,100,50)', this.G],
            ['hsl(120,100,90)', color("#CFC") ],
            ['hsla(120,100,50,1)', this.G],
            ['hsv(120,100,100)', this.G],
            ['hsva(120,100,100,1)', this.G],
            ['rgb8(0,255,0)', this.G],
            ['rgba8(0,255,0,255)', this.G],
            ['float3(0,1,0)', this.G],
            ['float4(0,1,0,1)', this.G],
            ['packed_rgba(16711935)', this.G],
            ['packed_rgba(0x00FF00FF)', this.G],
            ['packed_argb(4278255360)', this.G],
            ['packed_argb(0xFF00FF00)', this.G],
        ];
        
        _.each(table, function(row) {
            var c = color(row[0]);
            var d = row[1];
            _.each([ "red", "green", "blue", "html"], function (method) {
                test.strictEqual( c[method](), d[method]() );
            });
        });
        test.done();
    },
    
    "Color Argument Formats" : function (test)
    {
        var table = [
            [['rgb(255,0,0)'], this.R, true],
            [['rgb', 255, 0, 0], this.R, true],
            [['rgb', [255, 0, 0]], this.R, true],
            [['rgba(255,0,0,1)'], this.R, true],
            [['rgba(100%,0,0,100%)'], this.R, true],
            [['rgba(255,0,0,100%)'], this.R, true],
            [['rgb(1,0,0)'], this.R, false],
            [['rgb', 1, 0, 0], this.R, false],
            [['rgb', [255, 0, 1]], this.R, false],
            [['rgba(255,0,0,0)'], this.R, false],
            [['rgba(50%,0,0,100%)'], this.R, false],
            [['rgba(255,0,0,20%)'], this.R, false],
            
            [ ['packed_rgba', 4278190335], this.R, true ],
            [ ['packed_rgba', 0xFF0000FF], this.R, true ],
            [ ['packed_argb', 4294901760], this.R, true ],
            [ ['packed_argb', 0xFFFF0000], this.R, true ],

            [['rgb(0,255,0)'], this.G, true],
            [['rgb', 0, 255, 0], this.G, true],
            [['rgb', [0, 255, 0]], this.G, true],
            [['rgba(0,255,0,1)'], this.G, true],
            [['rgba(0,100%,0,100%)'], this.G, true],
            [['rgba(0,255,0,100%)'], this.G, true]
        ];
        
        _.each(table, function (row)
        {
            var c = color.apply(null, row[0]);
            var d = row[1];
            var type = row[2] ? "strictEqual" : "notStrictEqual";
                        
            test[type]( c.html(), d.html() );
        });        
        test.done();
    },
    
    "packed_rgba Format" : function (test)
    {
        var table = [
            // Test channel layout
            [ ['packed_rgba',   0xFFFFFFFF],    'rgba(255,255,255,1)' ],
            [ ['packed_rgba',   0xFF0000FF],    'rgba(255,0,0,1)' ],
            [ ['packed_rgba',   0x00FF00FF],    'rgba(0,255,0,1)' ],
            [ ['packed_rgba',   0x0000FFFF],    'rgba(0,0,255,1)' ],
            [ ['packed_rgba',   0x00FFFFFF],    'rgba(0,255,255,1)' ],
            [ ['packed_rgba',   0xFF00FFFF],    'rgba(255,0,255,1)' ],
            [ ['packed_rgba',   0xFFFF00FF],    'rgba(255,255,0,1)' ],
            
            // Test color values
            [ ['packed_rgba',   0x0000FFFF],    'rgba8(0,0,255,255)' ],
            [ ['packed_rgba',   0x0000EEFF],    'rgba8(0,0,238,255)' ],
            [ ['packed_rgba',   0x0000CCFF],    'rgba8(0,0,204,255)' ],
            [ ['packed_rgba',   0x000066FF],    'rgba8(0,0,102,255)' ],
            [ ['packed_rgba',   0x000033FF],    'rgba8(0,0,51,255)' ],
            [ ['packed_rgba',   0x000000FF],    'rgba8(0,0,0,255)' ],

            // Test alpha channel
            [ ['packed_rgba',   0x000000FF],    'rgba8(0,0,0,255)' ],
            [ ['packed_rgba',   0x000000EE],    'rgba8(0,0,0,238)' ],
            [ ['packed_rgba',   0x000000CC],    'rgba8(0,0,0,204)' ],
            [ ['packed_rgba',   0x00000066],    'rgba8(0,0,0,102)' ],
            [ ['packed_rgba',   0x00000033],    'rgba8(0,0,0,51)' ],
            [ ['packed_rgba',   0x00000000],    'rgba8(0,0,0,0)' ],
            
            // Test signed values
            [ ['packed_rgba(-7811841)'],        'rgba8(255,136,204,255)' ],
            [ ['packed_rgba', -7811841],        'rgba8(255,136,204,255)' ],
            
            // Whitespace
            [ ['packed_rgba(-7811841)'],        'rgba8(255,136,204,255)' ],
            [ ['packed_rgba( -7811841 )'],      'rgba8(255,136,204,255)' ],
            [ ['packed_rgba (-7811841)'],       'rgba8(255,136,204,255)' ]
        ];
        
        _.each(table, function (row)
        {
            var c = color.apply(null, row[0]).rgba8().toString();  
            var d = color(row[1]).rgba8().toString();
            test.strictEqual(c, d);
        });        
        test.done();
    },
    
    "packed_arbg Format" : function (test)
    {
        var table = [
            // Test channel layout
            [ ['packed_argb',   0xFFFFFFFF],    'rgba(255,255,255,1)' ],
            [ ['packed_argb',   0xFFFF0000],    'rgba(255,0,0,1)' ],
            [ ['packed_argb',   0xFF00FF00],    'rgba(0,255,0,1)' ],
            [ ['packed_argb',   0xFF0000FF],    'rgba(0,0,255,1)' ],
            [ ['packed_argb',   0xFF00FFFF],    'rgba(0,255,255,1)' ],
            [ ['packed_argb',   0xFFFF00FF],    'rgba(255,0,255,1)' ],
            [ ['packed_argb',   0xFFFFFF00],    'rgba(255,255,0,1)' ],
            
            // Test color values
            [ ['packed_argb',   0xFF0000FF],    'rgba8(0,0,255,255)' ],
            [ ['packed_argb',   0xFF0000EE],    'rgba8(0,0,238,255)' ],
            [ ['packed_argb',   0xFF0000CC],    'rgba8(0,0,204,255)' ],
            [ ['packed_argb',   0xFF000066],    'rgba8(0,0,102,255)' ],
            [ ['packed_argb',   0xFF000033],    'rgba8(0,0,51,255)' ],
            [ ['packed_argb',   0xFF000000],    'rgba8(0,0,0,255)' ],

            // Test alpha channel
            [ ['packed_argb',   0xFF000000],    'rgba8(0,0,0,255)' ],
            [ ['packed_argb',   0xEE000000],    'rgba8(0,0,0,238)' ],
            [ ['packed_argb',   0xCC000000],    'rgba8(0,0,0,204)' ],
            [ ['packed_argb',   0x66000000],    'rgba8(0,0,0,102)' ],
            [ ['packed_argb',   0x33000000],    'rgba8(0,0,0,51)' ],
            [ ['packed_argb',   0x00000000],    'rgba8(0,0,0,0)' ],
            
            // Test signed values
            [ ['packed_argb(-7811841)'],        'rgba8(136,204,255,255)' ],
            [ ['packed_argb', -7811841],        'rgba8(136,204,255,255)' ]
        ];
        
        _.each(table, function (row)
        {
            var c = color.apply(null, row[0]).rgba8().toString();  
            var d = color(row[1]).rgba8().toString();
            test.strictEqual(c, d);
        });        
        test.done();
    },
    
    "Color formats - invalid" : function (test)
    {
        var table = [
            'redd',
            'red$',
            '$red$',
            'red 4',
    // ' red',   // Should this throw?  Should it auto trim?
            '123',
        ];
        
        _.each(table, function (row)
        {
            test.throws(function() { color(row); });
        });
        test.done();
    },
    
    "Percentage Formats" : function (test)
    {
        var table = [
            [ [ 'rgb(100%,0%,0%)' ],                [ 255, 0, 0, 255 ] ],
            [ [ 'rgba(100%,0%,0%,100%)' ],          [ 255, 0, 0, 255 ] ],
            [ [ 'hsl(0,100%,50%)' ],                [ 255, 0, 0, 255 ] ],
            [ [ 'hsla(0,100%,50%,100%)' ],          [ 255, 0, 0, 255 ] ],
            [ [ 'hsv(0,100%,100%)' ],               [ 255, 0, 0, 255 ] ],
            [ [ 'hsva(0,100%,100%,100%)' ],         [ 255, 0, 0, 255 ] ],
            [ [ 'rgb8(100%,0%,0%)' ],               [ 255, 0, 0, 255 ] ],
            [ [ 'rgba8(100%,0%,0%,100%)' ],         [ 255, 0, 0, 255 ] ],
            [ [ 'float3(100%,0%,0%)' ],             [ 255, 0, 0, 255 ] ],
            [ [ 'float4(100%,0%,0%,100%)' ],        [ 255, 0, 0, 255 ] ]
        ];
        
        this.compareTableRGBA8(table, test);
        test.done();
    },
    
    "Case Sensitivity" : function (test)
    {

        var table = [
            [ [ 'Red' ],                [ 255, 0, 0, 255 ] ],
            [ [ 'RED' ],                [ 255, 0, 0, 255 ] ],
            [ [ 'reD' ],                [ 255, 0, 0, 255 ] ],
            [ [ 'ReD' ],                [ 255, 0, 0, 255 ] ],
            [ [ '#f00' ],               [ 255, 0, 0, 255 ] ],
            [ [ '#fF0000' ],            [ 255, 0, 0, 255 ] ],
            [ [ 'rGb(255,0,0)' ],       [ 255, 0, 0, 255 ] ],
            [ [ 'rgBA(255,0,0,1)' ],    [ 255, 0, 0, 255 ] ],
            [ [ 'hSL(0,100,50)' ],      [ 255, 0, 0, 255 ] ],
            [ [ 'HSla(0,100,50,1)' ],   [ 255, 0, 0, 255 ] ],
            [ [ 'HSV(0,100,100)' ],     [ 255, 0, 0, 255 ] ],
            [ [ 'hsVA(0,100,100,1)' ],  [ 255, 0, 0, 255 ] ],
            [ [ 'flOAt3(1,0,0)' ],      [ 255, 0, 0, 255 ] ],
            [ [ 'FLOAT4(1,0,0,1)' ],    [ 255, 0, 0, 255 ] ],
        ];
        
        this.compareTableRGBA8(table, test);
        test.done();
    },
    
    "Whitespace" : function (test)
    {

        var table = [
            [ [ 'red' ],                            [ 255, 0, 0, 255 ] ],
            [ [ ' red' ],                           [ 255, 0, 0, 255 ] ],
            [ [ 'red ' ],                           [ 255, 0, 0, 255 ] ],
            [ [ ' red ' ],                          [ 255, 0, 0, 255 ] ],
            [ [ 'rgb(255, 0, 0)' ],                 [ 255, 0, 0, 255 ] ],
            [ [ 'rgba(255,0 , 0,1)' ],              [ 255, 0, 0, 255 ] ],
            [ [ 'hsl (0,100,50)' ],                 [ 255, 0, 0, 255 ] ],
            [ [ ' hsla(0,100,50,1)' ],              [ 255, 0, 0, 255 ] ],
            [ [ 'hsv   (   0, 100,100 ) ' ],        [ 255, 0, 0, 255 ] ],
            [ [ ' hsva ( 0 , 100 , 100 , 1 ) ' ],   [ 255, 0, 0, 255 ] ],
        ];
        
        this.compareTableRGBA8(table, test);
        test.done();
    },
    
    
    "Blend Tests (self)" : function (test)
    {
        var table = [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1.0];
    
        _.each(table, function (a)
        {
            var c = color('snow').blend('snow', a).html('rgba'); 
            var d = 'rgba(255,250,250,1)';
            test.strictEqual(c, d);
        });
        test.done();
    },
    
    "Blend Tests (self, alpha)" : function (test)
    {
        var table = [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1.0];
    
        _.each(table, function (a)
        {
            var c = color('snow').alpha(0).blend('snow', a).html('rgba'); 
            var d = 'rgba(255,250,250,' + a + ')';
            test.strictEqual(c, d);
        });
        test.done();
    },
    
    
    "Hue Modifications" : function (test)
    {
        var table = 
        [
            [[120], 'rgba(0,204,0,1)'],
            [[120.0], 'rgba(0,204,0,1)'],
            [['120'], 'rgba(0,204,0,1)'],
            [['120.0'], 'rgba(0,204,0,1)'],
            [['+120'], 'rgba(204,0,136,1)'],
            [['+', 120], 'rgba(204,0,136,1)'],
            [['+', '120'], 'rgba(204,0,136,1)'],
            [['-120'], 'rgba(136,204,0,1)'],
            [['+=120'], 'rgba(204,0,136,1)'],
            [['-=120'], 'rgba(136,204,0,1)'],
            [['-=', 120], 'rgba(136,204,0,1)'],
            [['-=', '120'], 'rgba(136,204,0,1)'],
        ];

        
        _.each(table, function (row)
        {
            var base = color('#08C');
            var c = base.hue.apply(base, row[0]).html('rgba');
            var d = row[1];
            test.strictEqual(c, d);
        });
        test.done();
    }    
};

suite["Methods"] =
{
    "add" : function (test)
    {
        var white = color('rgb', 255, 255, 255);
        var black = color('rgb', 0,0,0);
        var red   = color('rgb', 255,0,0);
    
        var table = [
            [ black,    black,      [ 0, 0, 0, 255 ] ],
            [ white,    black,      [ 255, 255, 255, 255 ] ],
            [ white,    white,      [ 255, 255, 255, 255 ] ],
            [ black,    red,        [ 255, 0, 0, 255 ] ],
            [ red,      black,      [ 255, 0, 0, 255 ] ],
        ];
        
        _.each(table, function (row)
        {
            // Make sure the addition is correct
            test.deepEqual( row[0].add(row[1]).rgba8(), row[2] );
            
            // Make sure the base colors were not affected
            test.deepEqual( white.rgba8(), [ 255, 255, 255, 255 ]);
            test.deepEqual( black.rgba8(), [ 0, 0, 0, 255 ]);
        });
        test.done();
    },
    
    "sub" : function (test)
    {
        var white = color('rgb', 255, 255, 255);
        var black = color('rgb', 0,0,0);
        var red   = color('rgb', 255,0,0);
    
        var table = [
            [ black,    black,      [ 0, 0, 0, 255 ] ],
            [ white,    black,      [ 255, 255, 255, 255 ] ],
            [ white,    white,      [ 0, 0, 0, 255 ] ],
            [ black,    red,        [ 0, 0, 0, 255 ] ],
            [ red,      black,      [ 255, 0, 0, 255 ] ],
        ];
        
        _.each(table, function (row)
        {
            // Make sure the addition is correct
            test.deepEqual( row[0].sub(row[1]).rgba8(), row[2], row[0].rgba8() + " - " + row[1].rgba8() );
            
            // Make sure the reference colors were not affected
            test.deepEqual( white.rgba8(), [ 255, 255, 255, 255 ]);
            test.deepEqual( black.rgba8(), [ 0, 0, 0, 255 ]);
        });
        test.done();
    },      
    
    "inc" : function (test)
    {
        var white = color('rgb', 255, 255, 255);
        var black = color('rgb', 0,0,0);
        var red   = color('rgb', 255,0,0);
    
        var table = [
            [ black,    black,      [ 0, 0, 0, 255 ] ],
            [ white,    black,      [ 255, 255, 255, 255 ] ],
            [ white,    white,      [ 255, 255, 255, 255 ] ],
            [ black,    red,        [ 255, 0, 0, 255 ] ],
            [ red,      black,      [ 255, 0, 0, 255 ] ],
        ];
        
        _.each(table, function (row)
        {
            var base = row[0].clone();
        
            // Make sure the addition is correct
            test.deepEqual( base.inc(row[1]).rgba8(), row[2] );

            // Make sure the base value was changed
            test.deepEqual( base.rgba8(), row[2] );
            
            // Make sure the reference colors were not affected
            test.deepEqual( white.rgba8(), [ 255, 255, 255, 255 ]);
            test.deepEqual( black.rgba8(), [ 0, 0, 0, 255 ]);
        });
        test.done();
    },
    
    "dec" : function (test)
    {
        var white = color('rgb', 255, 255, 255);
        var black = color('rgb', 0,0,0);
        var red   = color('rgb', 255,0,0);
    
        var table = [
            [ black,    black,      [ 0, 0, 0, 255 ] ],
            [ white,    black,      [ 255, 255, 255, 255 ] ],
            [ white,    white,      [ 0, 0, 0, 255 ] ],
            [ black,    red,        [ 0, 0, 0, 255 ] ],
            [ red,      black,      [ 255, 0, 0, 255 ] ],
        ];
        
        _.each(table, function (row)
        {
            var base = row[0].clone();
        
            // Make sure the addition is correct
            test.deepEqual( base.dec(row[1]).rgba8(), row[2], row[0].rgba8() + " -= " + row[1].rgba8() );

            // Make sure the base value was changed
            test.deepEqual( base.rgba8(), row[2] );
            
            // Make sure the reference colors were not affected
            test.deepEqual( white.rgba8(), [ 255, 255, 255, 255 ]);
            test.deepEqual( black.rgba8(), [ 0, 0, 0, 255 ]);
        });
        test.done();
    },  
    
};

suite["Regressions"] = 
{
    "Set 1" : function (test)
    {
        var triadL = _.memoize(function (s) {
            return color(s).triad();
        });
    
        var fix = function (v)
        {
            for (var i = 0; i < v.length; ++i)
                v[i] = parseFloat( v[i].toFixed(3) );
            return v;
        };
    
        var table = [
            [function () { return color('white').float3().toString(); }, '1,1,1'],
            [function () { return color('white').float4().toString(); }, '1,1,1,1'],
            [function () { return color('white').html('rgb'); }, 'rgb(255,255,255)'],
        
            [function () { return color('snow').html('hex6'); }, '#fffafa'],
            [function () { return color('snow').html('rgb'); }, 'rgb(255,250,250)'],
            [function () { return "" + fix( color('snow').float3() ); }, '1,0.98,0.98' ],
            [function () { return "" + fix( color('snow').float4() ); }, '1,0.98,0.98,1' ],
            [function () { return color('snow').html('keyword'); }, 'snow'],

            [function () { return color('rgb(128,64,200)').html('rgb'); }, 'rgb(128,64,200)'],
            [function () { return color('rgb(128,64,200)').html('rgba'); }, 'rgba(128,64,200,1)'],
            [function () { return color('#C0C0C0').hex6(); }, '#c0c0c0'],

            [function () { return triadL('red')[0].hex3(); }, '#f00'],
            [function () { return triadL('red')[1].hex3(); }, '#0f0'],
            [function () { return triadL('red')[2].hex3(); }, '#00f'],
            [function () { return triadL('darkseagreen')[0].hex6(); }, '#8fbc8f'],
            [function () { return triadL('darkseagreen')[1].hex6(); }, '#8f8fbd'],
            [function () { return triadL('darkseagreen')[2].hex6(); }, '#bd8f8f'],

            [function () { return color('tomato').triad()[1].hex6(); }, '#47ff63'],
            [function () { return color('tomato').hue('+', 120).hex6(); }, '#47ff63'],
            [function () { return color('tomato').triad()[1].hex3(); }, '#4f6'],
            [function () { return color('tomato').hue('+', 120).hex3(); }, '#4f6'],
            [function () { return color('rgba(255, 0, 0, 0)').alpha(); }, 0.0],
            [function () { return color('rgba(255, 0, 0, .1)').alpha(); }, 0.1],
            [function () { return color('rgba(255, 0, 0, .2)').alpha(); }, 0.2],
            [function () { return color('rgba(255, 0, 0, .8)').alpha(); }, 0.8],
            [function () { return color('rgba(255, 0, 0, 1.0)').alpha(); }, 1.0],
            [function () { return color('rgba8(255, 0, 0, 0)').alpha(); }, 0.0],
            [function () { return color('rgba8(255, 0, 0, 255)').alpha(); }, 1.0],
            [function () { return color('rgba(0,0,0,0.0)').blend('rgba(0,0,0,1.0)', .5).alpha(); }, 0.5],
            [function () { return color('rgba(0,0,0,0.0)').blend('rgba(0,0,0,1.0)', .25).alpha(); }, 0.25],
            [function () { return color('rgba(0,0,0,1.0)').blend('rgba(0,0,0,0.0)', .75).alpha(); }, 0.25],

            [function () { return color('tomato').tone(.2).html(); }, "rgba(230,105,82,1)"],
            [function () { return color('tomato').tint(.2).html(); }, "rgba(255,130,108,1)"],
            [function () { return color('tomato').shade(.2).html(); }, "rgba(204,79,57,1)"],
            [function () { return color('tomato').complement().html(); }, "rgba(71,227,255,1)"],
            [function () { return color('tomato').saturation(5).html(); }, "rgba(255,244,242,1)"],
            [function () { return color('tomato').value(5).html(); }, "rgba(13,5,4,1)"],
            
            [function () { return color('tomato').rgb().length; }, 3],
            
            [function () { return color('yellow').grayvalue(); }, 170/255 ],
            [function () { return color('yellow').luminance(); }, 0.9278 ],
            [function () { return color('yellow').grayvalue8(); }, 170 ],
            [function () { return color('yellow').luminance8(); }, 237 ],
            [function () { return color('hsl', 74, 67, 44).hex6(); }, "#98bb25" ],
            [function () { return color('hsl', 6, 47, 12).hex6(); }, "#2d1310" ]
        ];
        
        _.each(table, function (row) {
            var a = row[0]();
            var b = row[1];
            test.strictEqual(a, b);
        });
        test.done();
    }
};


Object.keys(suite).forEach(function(key) {
    exports[key] = suite[key];
});