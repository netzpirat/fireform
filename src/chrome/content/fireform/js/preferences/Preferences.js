/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
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
 * Portions created by the Initial Developer are Copyright (C) 2005
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
 * Managers the fireform preferences
 * (observe virtual user change, load
 * all gui elements)
 *
 * @constructor
 */
function Preferences() {

   // set up all preference elements
   this.preferenceArray = new Array(
      new UserListPreference("fireform-userList"),
      new BooleanPreference("fireform-autosave", false),
      new BooleanPreference("fireform-autoload", false),
      new BooleanPreference("fireform-savepasswords", false),
      new BooleanPreference("fireform-encryptpasswords", true),
      new BooleanPreference("fireform-visualize", true),
      new BooleanPreference("fireform-overwrite", true),
      new BooleanPreference("fireform-emptyvalues", true),
      new BooleanPreference("fireform-hash-hostname", false),
      new BooleanPreference("fireform-hash-pathname", false),
      new BooleanPreference("fireform-hash-search", false),
      new BooleanPreference("fireform-hash-form", false),
      new RegExpListPreference("fireform-excludeParameterList"),
      new RegExpListPreference("fireform-loadNeverList"),
      new RegExpListPreference("fireform-loadAlwaysList"),
      new RegExpListPreference("fireform-saveNeverList"),
      new RegExpListPreference("fireform-saveAlwaysList")
   );

   // observe user change
   var prefChangeObserver = {
      observe :
      function(aSubject, aTopic, aData) {
         preferences.load();
      }
   };
   
   // add observer to preference
   var query = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.fireform.").QueryInterface(Components.interfaces["nsIPrefBranchInternal"]);
   query.addObserver("fireform-activeuser", prefChangeObserver, false);

   /**
    * load all preferences to the gui
    */
   this.load = function() {
      for (var p=0; p<this.preferenceArray.length; p++) {
         var pref = this.preferenceArray[p];
         pref.loadElement();
      }   
   };
   
   /**
    * returns a preference object by 
    * element or by element id
    */
   this.getPreference = function(element) {
      for (var p=0; p<this.preferenceArray.length; p++) {
         var prefElement = this.preferenceArray[p];
         if (element.id) {
            if (prefElement.elementId == element.id) {
               return prefElement;
            }
         } else {
            if (prefElement.elementId == element) {
               return prefElement;
            }
         }
      }   
   }

   /**
    * string representation
    */
   this.toString = function() {
      return "Fireform Preferences";
   };   
}