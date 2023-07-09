#include <assert.h>
#include <ctype.h>
#include <stdio.h>

/* Exercise 3-3.
 * Write a function expand(s1,s2) that expands
 * shorthand notations like a-z in the string s1 into the
 * equivalent complete list abc...xyz in s2.
 * Allow for letters of either case and digits,
 * and be prepared to handle cases like a-b-c and a-z0-9 and -a-z.
 * Arrange that a leading or trailing - is taken literally.
*/

#define MAXLINE 1000

void expand(char src[], char dest[]);
int isvaliddigitexpansion(int start, int end);
int isvaliduppercaseexpansion(int start, int end);
int isvalidlowercaseexpansion(int start, int end);

int main() {
    char source[MAXLINE];
    char dest[MAXLINE * 26];

    scanf("%s", source);

    expand(source, dest);

    printf("%s\n", dest);

    return 0;
}

void expand(char s1[], char s2[]) {
   int i = 0;
   int j = 0;
   while (s1[i] != '\0') {
       if (s1[i] == '-') {
           if (isvaliddigitexpansion(s1[i-1], s1[i+1]) ||
                   isvaliduppercaseexpansion(s1[i-1], s1[i+1]) ||
                   isvalidlowercaseexpansion(s1[i-1], s1[i+1])) {
               j--; // Rewind the expanded string
               for (int k = s1[i-1]; k <= s1[i+1]; k++)
                   s2[j++] = k;
               i += 2;
               continue;
           }
       }

       s2[j++] = s1[i++];
   }
   s2[j] = '\0';
}

int isvaliddigitexpansion(int s, int e) {
    return isdigit(s) && isdigit(e) && s < e;
}

int isvaliduppercaseexpansion(int s, int e) {
    return isupper(s) && isupper(e) && s < e;
}

int isvalidlowercaseexpansion(int s, int e) {
    return islower(s) && islower(e) && s < e;
}
