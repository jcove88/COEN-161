#include <stdio.h>   // fprintf(), fread(), fwrite(), fopen(), fclose()
#include <stdlib.h>  // malloc(), free()
#include <unistd.h>  // read(), write()
#include <fcntl.h>   // open(), close()
#include <errno.h>   // errno

#define BUF_SIZE (2048) //buffer size

// copies a file from src_filename to dst_filename using functions fopen(), fread(), fwrite(), fclose()
int func_copy(char* src_filename, char* dst_filename) {
        FILE *src, *dst;
        void* buf;

        src = fopen(src_filename, "r"); // opens a file for reading
        if (src == NULL) { // fopen() error checking
                fprintf(stderr, "unable to open %s for reading: %i\n", src_filename, errno);
                exit(0);
        }
        dst = fopen(dst_filename, "w"); // opens a file for writing; erases old file/creates a new file
        if (dst == NULL) { // fopen() error checking
                fprintf(stderr, "unable to open/create %s for writing: %i\n", dst_filename, errno);
                exit(0);
        }
        buf = malloc((size_t)BUF_SIZE);  // allocate a buffer to store read data
        // reads content of file is loop iterations until end of file
        int bytes_read; //holds number of bytes read
        // writes bytes_read to dst_filename 
        while((bytes_read = fread(buf, 1, BUF_SIZE, src)) > 0){
                if(fwrite(buf, 1, bytes_read, dst) < 0){ //while its writing and reading the size of buffer through each loop
                        fprintf(stderr, "error: %i/n", errno);
                        exit(0);
                }
        }
        fclose(src); // closes src file pointer
        fclose(dst); // closes dst file pointer
        free(buf); // frees memory used for buf
        return 0;
}

