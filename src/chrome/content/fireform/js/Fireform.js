/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http:www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is from fireform.
 *
 * The Initial Developer of the Original Code is
 * Michael Kessler, Bluewin AG <michael.kessler@team.bluewin.com>.
 * Portions created by the Initial Developer are Copyright (C) 2003
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * the fireform toolbar.
 *
 * @constructor
 */
function Fireform() {

   // load preferences
   this.preferences = new Preferences();
   
   /**
    * load form data
    */
   this.loadForm = function() {
      alert("Load Form");
   };
   
   /**
    * save form data
    */
   this.saveForm = function() {
      alert("Save Form");
   };
 
   /**
    * reset form data
    */
   this.resetForm = function() {
      var pageForms = window.content.document.forms;
      // loop through all forms
      for(var i = 0; i < pageForms.length; i++) {
        pageForms[i].reset();
      }
   };

   /**
    * delete form data
    */
   this.deleteForm = function() {
      alert("Delete Form");
   };

   /**
    * open preference dialog
    */
   this.openPreferences = function() {
      window.open('chrome://fireform/content/xul/Preferences.xul', 'pref', 'chrome,dialog,centerscreen,modal');
   };

   /**
    * open help
    */
   this.openHelp = function() {
      var browser = getBrowser();
      var tab = browser.addTab('http://www.netzpiraten.ch', getReferrer(document));
      browser.selectedTab = tab;
   };
 
   /**
    * create the user menu
    */
   this.createUserMenu = function(menu) {
      //delegate to the user list preference element
      this.preferences.getPreference("fireform-userList").createUserMenu(menu);
   }
   
   /**
    * set a new active user from the
    * toolbar menupopup
    *
    * @param the menuitem triggered the change
    */
   this.changeUser = function(menuitem) {
      alert(menuitem);
   }
   
   /**
    * Object info as String
    *
    * @return string representation
    */
   this.toString = function() {
      return "Fireform Main";
   };
}

