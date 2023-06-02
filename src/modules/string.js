// string.js
export function useString() {

    function getInitials(username) {
        // Check if the username contains a dot
        const hasDot = username.includes('.');
      
        // Extract the first character from the username and convert it to uppercase
        const firstCharacter = username.charAt(0).toUpperCase();
      
        // Extract the second character from the username or use an empty string
        const secondCharacter = hasDot ? username.charAt(username.indexOf('.') + 1).toUpperCase() : username.charAt(1).toUpperCase();
      
        // Join the first and second characters together
        return firstCharacter + secondCharacter;
      }
      
      

    return { 
        getInitials 
    }
}  