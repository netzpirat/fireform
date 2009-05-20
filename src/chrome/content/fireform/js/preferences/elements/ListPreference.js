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
 * Manages list style preferences.
 * Represents a XUL listbox element.
 * Provides template methods for 
 * different implementations (user listbox
 * and regexp user context preferences)
 *
 * @param elementId the xul element id in the dialog
 *
 * @constructor
 */
function ListPreference(elementId) {

   // inherit
   this.superclass = PreferencesService;
   this.superclass();
   
   this.elementId = elementId;
   
   /**
    * put preference values to its gui representation
    */
   this.loadElement = function() {
      // clear list
      var listBox = document.getElementById(this.elementId);
      while(listBox.getRowCount() != 0) {
         listBox.removeItemAt(0);
      }
      // load values
      var prefs = this.getListBranch();
      var count = { value : 0 };
      var childList = prefs.getChildList("", count);      
      for(i = 0; i < count.value; i++) {
         listBox.appendItem(prefs.getCharPref(childList[i]), childList[i]);
      }
   };

   /**
    * store list entry to the preference store
    */
   this.saveElement = function() {
      // clear branch
      var prefs = this.getListBranch();
      prefs.deleteBranch("");
      // save values
      var listBox = document.getElementById(this.elementId);
      for(i = 0; i < listBox.getRowCount(); i++) {
         prefs.setCharPref(listBox.getItemAtIndex(i).value, listBox.getItemAtIndex(i).label);
      }
   }
   
   /**
    * returns the list values as array
    */
   this.getValueArray = function() {
      // load values
      var prefs = this.getListBranch();
      var count = { value : 0 };
      var childList = prefs.getChildList("", count); 
      var valueArray = new Array(count.value);     
      for(i = 0; i < count.value; i++) {
         valueArray[i] = prefs.getCharPref(childList[i]);
      }
      return valueArray;
   };

   /**
    * add a new list entry
    */
   this.addEntry = function() {
      var value = window.prompt(this.stringBundle.getString("addentry"), "");
      if (!this.validateEntry(value)) {
         return;
      }
      if (value != "") {
         var listBox = document.getElementById(this.elementId);
         listBox.appendItem(value, this.elementId + listBox.getRowCount());
         this.saveElement();
      }
   }
   
   /**
    * edit the selected list entry
    */
   this.editEntry = function() {
      var listBox = document.getElementById(this.elementId);
      for(i = 0; i < listBox.selectedCount; i++) {
         var selectedItem = listBox.getSelectedItem(i);
         var value = window.prompt(this.stringBundle.getString("editentry"), selectedItem.label);
         if (!this.validateEntry(value)) {
            return;
         }
         if (value != "") {
            selectedItem.label = value;
            this.saveElement();
         }
      }
   }
   
   /**
    * remove the selected list entry
    */
   this.removeEntry = function() {
      var listBox = document.getElementById(this.elementId);
      for(i = 0; i < listBox.selectedCount; i++) {
         listBox.removeItemAt(listBox.getIndexOfItem(listBox.getSelectedItem(i)));
      }
   }
   
   /**
    * returns the list branch
    * Template method for subclasses
    */
   this.getListBranch = function() {
      return this.getUserPreferenceStoreBranch(this.elementId);
   }
   
   /**
    * validate list entry 
    * Template method for subclasses
    */
   this.validateEntry = function(value) {
      //template method accepts everything
      return true;
   }
   
   /**
    * string representation
    */
   this.toString = function() {
      return "ListPreference " + this.elementId + " = " + this.getValueArray();
   };
} 


// inherit
ListPreference.prototype = new PreferencesService();
