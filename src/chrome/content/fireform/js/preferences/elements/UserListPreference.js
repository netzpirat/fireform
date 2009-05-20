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
 * Manages virtual users (toolbar
 * userchange and preferences
 *
 * @param elementId the xul element id in the dialog
 *
 * @constructor
 */
function UserListPreference(elementId) {

   // inherit
   this.superclass = ListPreference;
   this.superclass();
      
   this.elementId = elementId;

   /**
    * put preference values to
    * its gui representation
    * 
    * overwrites ListPreference.loadElement()
    */
   this.loadElement = function() {
      // remove onselelect from the listbox
      // otherwise it will trigger a this.changeUser()
      var listBox = document.getElementById(this.elementId);
      var onSelectHandler = listBox.onselect;
      listBox.onselect = null;
      // clear list
      while(listBox.getRowCount() != 0) {
         listBox.removeItemAt(0);
      }
      // load values
      var prefs = this.getListBranch();
      var count = { value : 0 };
      var childList = prefs.getChildList("", count);      
      for(i=0; i<count.value; i++) {
         var item = listBox.appendItem(prefs.getCharPref(childList[i]), childList[i]);
         if (childList[i] == this.getActiveUser()) {
            listBox.selectItem(item);
         }
      }
      // restore this.changeUser()
      listBox.onselect = onSelectHandler;
   };
   
   /**
    * user change  within the preferences dialog.
    * the preference observer triggers the reload
    * of all elements 
    */
   this.changeUser = function(listBox) {
      if (listBox.selectedCount > 0) {
        this.getPreferenceStore().setCharPref("fireform-activeuser", listBox.selectedItem.value);
      }
   }

   /**
    * returns the list branch
    *
    * Overwrites ListPreference.getListBranch()
    */
   this.getListBranch = function() {
      return this.getPreferenceStoreBranch(this.elementId);
   }
   
   /**
    * create the toolbar user menupopup
    */
   this.createUserMenu = function(menu) {
      while (menu.childNodes.length > 0) {
         menu.removeChild(menu.lastChild);
      }
      // create user menus
      var prefs = this.getListBranch();
      var count = { value : 0 };
      var childList = prefs.getChildList("", count);
      for (i=0; i<count.value; i++) {
         var menuitem = document.createElement("menuitem");
         menuitem.setAttribute("label", prefs.getCharPref(childList[i]));
         menuitem.setAttribute("id", childList[i]);
         menuitem.setAttribute("value", childList[i]);
         menuitem.setAttribute("type", "radio");
         menuitem.setAttribute("oncommand", "toolbar.changeUser(this);");
         if (childList[i] == this.getActiveUser()) {
            menuitem.setAttribute("checked", "true");
         }
         menu.appendChild(menuitem);
      }
   }
   
   /**
    * string representation
    */
   this.toString = function() {
      return "UserListPreference " + this.elementId + " = " + this.getValueArray();
   };
} 

// inherit
UserListPreference.prototype = new ListPreference();