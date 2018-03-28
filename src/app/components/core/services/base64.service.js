/**
 * Frontend client application services:
 * Service to encode and decode base 64
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.services')
    .factory('base64', Base64Service);

  Base64Service.$inject = [];

  function Base64Service() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let lookup = null;
    let ie = /MSIE /.test(navigator.userAgent);
    let ieo = /MSIE [67]/.test(navigator.userAgent);

    return {
      encodeBase64: encodeBase64,
      decodeBase64: decodeBase64,
      urlEncodeBase64: urlEncodeBase64,
      urlDecodeBase64: urlDecodeBase64,
    };

    function decodeBase64(s) {
      s = s.replace(/\s/g, '');
      if (s.length % 4)
        throw new Error('InvalidLengthError: decode failed: The string to be decoded is not the correct length for a base64 encoded string.');
      if (/[^A-Za-z0-9+\/=\s]/g.test(s))
        throw new Error('InvalidCharacterError: decode failed: The string contains characters invalid in a base64 encoded string.');

      let buffer = fromUtf8(s);
      let position = 0;
      let result;
      let len = buffer.length;
      if (ieo) {
        result = [];
        while (position < len) {
          if (buffer[position] < 128) result.push(String.fromCharCode(buffer[position++]));
          else if (buffer[position] > 191 && buffer[position] < 224) result.push(String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63)));
          else result.push(String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63)));
        }
        return result.join('');
      } else {
        result = '';
        while (position < len) {
          if (buffer[position] < 128) result += String.fromCharCode(buffer[position++]);
          else if (buffer[position] > 191 && buffer[position] < 224) result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
          else result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
        }
        return result;
      }
    }

    function encodeBase64(s) {
      let buffer = toUtf8(s);
      let position = -1;
      let result;
      let len = buffer.length;
      let nan0, nan1, nan2, enc = [, , , ];
      if (ie) {
        result = [];
        while (++position < len) {
          nan0 = buffer[position];
          nan1 = buffer[++position];
          enc[0] = nan0 >> 2;
          enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
          if (isNaN(nan1))
            enc[2] = enc[3] = 64;
          else {
            nan2 = buffer[++position];
            enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
            enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
          }
          result.push(alphabet.charAt(enc[0]), alphabet.charAt(enc[1]), alphabet.charAt(enc[2]), alphabet.charAt(enc[3]));
        }
        return result.join('');
      } else {
        result = '';
        while (++position < len) {
          nan0 = buffer[position];
          nan1 = buffer[++position];
          enc[0] = nan0 >> 2;
          enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
          if (isNaN(nan1))
            enc[2] = enc[3] = 64;
          else {
            nan2 = buffer[++position];
            enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
            enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
          }
          result += alphabet[enc[0]] + alphabet[enc[1]] + alphabet[enc[2]] + alphabet[enc[3]];
        }
        return result;
      }
    }

    function fromUtf8(s) {
      let position = -1;
      let len, buffer = [];
      let enc = [, , , ];
      if (!lookup) {
        len = alphabet.length;
        lookup = {};
        while (++position < len) lookup[alphabet.charAt(position)] = position;
        position = -1;
      }
      len = s.length;
      while (++position < len) {
        enc[0] = lookup[s.charAt(position)];
        enc[1] = lookup[s.charAt(++position)];
        buffer.push((enc[0] << 2) | (enc[1] >> 4));
        enc[2] = lookup[s.charAt(++position)];
        if (enc[2] === 64) break;
        buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
        enc[3] = lookup[s.charAt(++position)];
        if (enc[3] === 64) break;
        buffer.push(((enc[2] & 3) << 6) | enc[3]);
      }
      return buffer;
    }

    function toUtf8(s) {
      let position = -1;
      let len = s.length;
      let chr, buffer = [];
      if (/^[\x00-\x7f]*$/.test(s))
        while (++position < len) buffer.push(s.charCodeAt(position));
      else
        while (++position < len) {
          chr = s.charCodeAt(position);
          if (chr < 128) buffer.push(chr);
          else if (chr < 2048) buffer.push((chr >> 6) | 192, (chr & 63) | 128);
          else buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
        }
      return buffer;
    }

    function urlDecodeBase64(input) {
      input = input
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      let pad = input.length % 4;
      if (pad) {
        if (pad === 1) {
          throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
        }
        input += new Array(5 - pad).join('=');
      }
      return decodeBase64(input);
    }

    function urlEncodeBase64(input) {
      let output = encodeBase64(input);
      return output
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .split('=', 1)[0];
    }
  }
})();
