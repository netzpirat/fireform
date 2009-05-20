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
 * Handles diffrent context sensible
 * preferences. Provides generic 
 * methods and is parent class of all
 * other preference elements.
 *
 * @constructor
 */
function PreferencesService() {

   // initialize preferences
   this.preferenceService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
   this.fireformPreferences = this.preferenceService.getBranch("extensions.fireform.");

   // load string bundle
   this.stringBundle = new StringBundle();
   
   /**
    * returns the active (selected) user
    */
   this.getActiveUser = function() {
      try {
         return this.fireformPreferences.getCharPref("fireform-activeuser");
      } catch(e) {
         // default user
         this.fireformPreferences.setCharPref("fireform-activeuser", "fireform-userList0");
         this.fireformPreferences.setCharPref("fireform-userList.fireform-userList0", "Default");
         return "fireform-userList0"
      }
   };
   
   /**
    * returns the active users branch
    */
   this.getUserPreferenceStore = function() {
      return this.preferenceService.getBranch("extensions.fireform." + this.getActiveUser() + "."); 
   };   

   /**
    * returns a subbranch of the active users branch
    */
   this.getUserPreferenceStoreBranch = function(name) {
      return this.preferenceService.getBranch("extensions.fireform." + this.getActiveUser() + "." + name + "."); 
   }; 

   /**
    * returns the main branch
    */
   this.getPreferenceStore = function() {
      return this.fireformPreferences;
   };   

   /**
    * returns a subbranch of the main branch
    */
   this.getPreferenceStoreBranch = function(name) {
      return this.preferenceService.getBranch("extensions.fireform." + name + "."); 
   }; 
      
   /**
    * string representation
    */
   this.toString = function() {
      return "PreferencesService";
   };
} 
