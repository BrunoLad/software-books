#include <assert.h>
#include <stdio.h>

/*Exercise 3-2.
 * Write a function escape(s,t) that converts characters
 * like newline and tab into visible escape sequences
 * like \n and \t as it copies the string t to s.
 * Use a switch. Write a function for the other direction as well,
 * converting escape sequences into the real characters.
 * */

#define MAXLINE 1000

void escape(char source[], char dest[]);
void removeescape(char source[], char dest[]);

int main() {

    int i = 0;
    char source[MAXLINE];
    // needs to be twice the size, in the worst case that
    // all values of source are \n
    char destination[2 * MAXLINE];
    char c;

    while (i < MAXLINE && (c = getchar()) != EOF) {
        source[i] = c;
        i++;
    }

    escape(source, destination);

    printf("%s\n", destination);
    
    removeescape(source, destination);

    printf("%s\n", destination);

    return 0;
}

void escape(char s[], char t[]) {
    int i, j; 
    i = j = 0;

    while (s[i] != '\0') {
        switch (s[i]) {
            case '\t':
                t[j] = '\\';
                t[++j] = 't';
                break;
            case '\n':
                t[j] = '\\';
                t[++j] = 'n';
                break;
            default:
                t[j] = s[i];
        }
        ++i;
        ++j;
    }
    t[j] = '\0';
}

void removeescape(char s[], char t[]) {
    int i, j;
    i = j = 0;

    while (s[i] != '\0') {
        switch(s[i]) {
            case '\\':
                switch(s[i+1]) {
                    case 't':
                        t[j] = '\t';
                        break;
                    case 'n':
                        t[j] = '\n';
                        break;
                    default:
                        t[j] = s[i]; // in case it's only 
                }
                i++;
                break;
            default:
                t[j] = s[i];
                break;
        }
        ++i;
        ++j;
    }
    t[j] = '\0';
}
