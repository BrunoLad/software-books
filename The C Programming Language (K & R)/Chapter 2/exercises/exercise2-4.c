#include <assert.h>
#include <stdio.h>
#include <string.h>

/*
 * Exercise 2-4.
 * Write an alternative version of squeeze(s1,s2)
 * that deletes each character in s1 that matches any character
 * in the string s2.
 */

int contains(char str[], int character);
void squeeze(char base[], char charsToRemove[]);

int main() {

    char s1[] = "abcdefgh";
    char s2[] = "abc";
    squeeze(s1, s2);
    assert(!strcmp(s1, "defgh"));

    return 0;
}

/* contains: returns first occurrence of c in s, or -1 otherwise */
int contains (char s[], int c) {
    int i = 0;

    while (s[i] != '\0') {
        if (s[i] == c)
            return i;
        i++;
    }

    return -1;
}

/* squeeze: delete all chars in s2 from s1 */
void squeeze(char s1[], char s2[]) {
    int i, j;

    for (i = j = 0; s1[i] != '\0'; i++)
        if (!(contains(s2, s1[i]) + 1))
            s1[j++] = s1[i];

    s1[j] = '\0';
}
