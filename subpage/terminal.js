document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
  
    // Add this line for the welcome message
    printOutput('Welcome to touchOS! For help and a full command list, enter help');
  
    inputElement.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        const command = inputElement.value.trim();
        executeCommand(command);
        inputElement.value = '';
      }
    });
  
    function executeCommand(command) {
      // Modify this switch statement to handle the new welcome message
      switch (command) {
        case '/help':
          printOutput('Available commands:\nls\nls -l\ncat <filename>\nclear\nhelp');
          break;
        // Add this case for the welcome message
        case '/welcome':
          printOutput('Welcome to touchOS! For help and a full command list, enter /help');
          break;
        case 'ls':
          printOutput('file1.txt   file2.txt   folder1');
          break;
        case 'cat file1.txt':
          printOutput('Contents of file1.txt:\nThis is the content of file1.txt.');
          break;
        case 'cat file2.txt':
          printOutput('Contents of file2.txt:\nThis is the content of file2.txt.');
          break;
        case 'help':
          printOutput('Available commands:\nls\nls -l\ncat <filename>\nclear\nhelp');
          break;
        case 'clear':
          outputElement.textContent = '';
          break;
        default:
          printOutput('Command not found. Type "/help" for a list of commands.');
      }
    }
  
    function printOutput(message) {
      outputElement.textContent += message + '\n';
    }
  });
  
  