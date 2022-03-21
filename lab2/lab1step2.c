#include <stdio.h>   // fprintf(), fread(), fwrite(), fopen(), fclose()
#include <stdlib.h>  // malloc(), free()
#include <unistd.h>  // read(), write()
#include <fcntl.h>   // open(), close()
#include <errno.h>   // errno

#define BUF_SIZE (2048) //buffer size

// copies a file from src_filename to dst_filename using syscalls open(), read(), write(), close()
int syscall_copy(char* src_filename, char* dst_filename)  {
        int src_fd, dst_fd;
        void* buf;

        src_fd = open(src_filename, O_RDONLY);  // opens a file for reading
        if (src_fd < 0) { // open() error checking
                fprintf(stderr, "unable to open %s for reading: %i\n", src_filename, errno);
                close(src_fd);
                exit(0);
        }
        // O_WRONLY - write only
        // O_CREAT - create file if it doesn't exist
        // O_TRUNC - truncates file to length 0 if it already exists (deletes existing file)
        // opens a file for writing; erases old file/creates a new file
        dst_fd = open(dst_filename, O_WRONLY | O_CREAT | O_TRUNC);
        if (dst_fd < 0) { // open() error checking
                fprintf(stderr, "unable to open/create %s for writing: %i\n", dst_filename, errno);
                close(dst_fd);
                exit(0);
        }
        // read/ write loop
        buf = malloc((size_t)BUF_SIZE);   // allocate a buffer to store read data
        int bytes_read;
        // reads up to BUF_SIZE bytes from src_filename
        while((bytes_read = read(src_fd, buf, BUF_SIZE)) > 0){
                if(write(dst_fd, buf, bytes_read) < 0){         //writed bytes_read to dst_filename
                        fprintf(stderr, "error: %i/n", errno);
                        exit(0);
                }
        }

        close(src_fd);  // closes src_fd file descriptor
        close(dst_fd);  // closes dst_fd file descriptor
        free(buf);      // frees memory used for buf

        return 0;
}

