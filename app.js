let $domain = '';
let $target = '';

jQuery(document).ready(function ($) {
  $('#save').click(function (event) {
    $domain = $('#DOMAIN').val();
    $target = $('#SERVER').val();

    try {
      var isFileSaverSupported = !!new Blob();
    } catch (e) {
      alert('FileSaver Not Supported Your Browser!');
      return false;
    }
    var blob = new Blob([_template()], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "" + $domain + "_cloudflare_dns_template.txt");

  });
});

function _template() {
  let _tmp = '' +
  ';;' +
  ';; Domain:     ' + $domain + '.\n' +
  ';; Exported:   2020-08-15 10:10:01\n' +
  ';;\n' +
  ';; This file is intended for use for informational and archival\n' +
  ';; purposes ONLY and MUST be edited before use on a production\n' +
  ';; DNS server.  In particular, you must:\n' +
  ';;   -- update the SOA record with the correct authoritative name server\n' +
  ';;   -- update the SOA record with the contact e-mail address information\n' +
  ';;   -- update the NS record(s) with the authoritative name servers for this domain.\n' +
  ';;\n' +
  ';; For further information, please consult the BIND documentation\n' +
  ';; located on the following website:\n' +
  ';;\n' +
  ';; http://www.isc.org/\n' +
  ';;\n' +
  ';; And RFC 1035:\n' +
  ';;\n' +
  ';; http://www.ietf.org/rfc/rfc1035.txt\n' +
  ';;\n' +
  ';; Please note that we do NOT offer technical support for any use\n' +
  ';; of this zone data, the BIND name server, or any other third-party\n' +
  ';; DNS software.\n' +
  ';;\n' +
  ';; Use at your own risk.\n' +
  ';; SOA Record\n' +
  '' + $domain + '. 3600  IN  SOA ' + $domain + '. root.' + $domain + '. 2034915280 7200 3600 86400 3600\n' +
  '\n' +
  ';; CNAME Records\n' +
  '' + $domain + '. 1 IN  CNAME ' + $target + '.\n' +
  'www.' + $domain + '. 1 IN  CNAME ' + $target + '.\n' +
  'mail.' + $domain + '.  1 IN  CNAME ' + $target + '.\n' +
  'webmail.' + $domain + '. 1 IN  CNAME ' + $target + '.\n' +
  '\n' +
  ';; MX Records\n' +
  '' + $domain + '. 1 IN  MX  10 ' + $target + '.\n' +
  '\n' +
  ';; SRV Records\n' +
  '_imaps._tcp.' + $domain + '. 1 IN  SRV 0 10 993 ' + $target + '.\n' +
  '_pop3s._tcp.' + $domain + '. 1 IN  SRV 0 10 995 ' + $target + '.\n' +
  '_smtps._tcp.' + $domain + '. 1 IN  SRV 0 10 465 ' + $target + '.\n' +
  '\n' +
  ';; TXT Records\n' +
  '_acme-challenge.' + $domain + '. 1 IN  TXT "SSL_ANAHTARI_EKLENECEK"\n' +
  'default._domainkey.' + $domain + '.  1 IN  TXT "v=DKIM1; "\n' +
  '_dmarc.' + $domain + '.  1 IN  TXT "v=DMARC1; p=none"\n' +
  '_domainconnect.' + $domain + '.  1 IN  TXT "domainconnect.plesk.com/host/' + $target + '/port/8443"\n' +
  '_domainkey.' + $domain + '.  1 IN  TXT "o=-"\n' +
  '' + $domain + '. 1 IN  TXT "v=spf1 mx a ptr a:' + $target + ' include:' + $target + ' ~all"\n';

  return _tmp;
}
