#include <assert.h>
#include <stdio.h>

int binsearch(int value, int list[], int size);

int main() {

    int arr[] = {4, 6, 7, 9, 10, 13, 15, 21, 30, 72};
    int input;
    
    printf("Insert a number: ");
    scanf("%d", &input);

    assert(binsearch(10, arr, 10) == 4);
    assert(binsearch(2, arr, 10) == -1);

    printf("Result of the search was: %d\n", binsearch(input, arr, 10));

    return 0;
}

/* binsearch: find x in v[0] <= v[1] <= ... <= v[n-1] */
int binsearch(int x, int v[], int n) {
    int low, high, mid;

    low = 0;
    high = n - 1;
    while (low <= high) {
        mid = (low + high) / 2;
        if (x < v[mid])
            high = mid - 1;
        else if (x > v[mid])
            low = mid + 1;
        else    /* found match */
            return mid;
    }

    return -1 /* no match */;
}
