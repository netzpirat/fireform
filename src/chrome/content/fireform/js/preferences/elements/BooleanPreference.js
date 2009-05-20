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
 * Handles boolean preferences. Represents
 * a checkbox in the preference dialog
 *
 * @param elementId the xul element id in the dialog
 * @param defaultValue used if preference is not stored
 *
 * @constructor
 */
function BooleanPreference(elementId, defaultValue) {

   // inherit
   this.superclass = PreferencesService;
   this.superclass();
   
   this.elementId = elementId;
   this.defaultValue = defaultValue;

   /**
    * put preference value to its gui representation
    */
   this.loadElement = function() {
      document.getElementById(this.elementId).checked = this.getValue();
   };

   /**
    * store preference value from its gui representation
    */
   this.saveElement = function() {
      var prefs = this.getUserPreferenceStore();
      prefs.setBoolPref(this.elementId, document.getElementById(this.elementId).checked);
   }
   
   /**
    * reads the preference value from the preference service
    */
   this.getValue = function() {
      var prefs = this.getUserPreferenceStore();
      try {
         return prefs.getBoolPref(this.elementId);
      } catch (e) {
         // default
         prefs.setBoolPref(this.elementId, this.defaultValue);
         return this.defaultValue;
      }
   };

   /**
    * string representation
    */
   this.toString = function() {
      return "BooleanPreference " + this.elementId + " = " + this.getValue();
   };
} 

// inherit
BooleanPreference.prototype = new PreferencesService();
