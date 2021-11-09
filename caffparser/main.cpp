#include <iostream>
#include <fstream>
#include <vector>

int main() {
    std::ifstream fin("/home/sasa/data1/projects/FiukSzGHomework/caffparser/caffs/1.caff",std::ios::out | std::ios::binary);
    if(!fin){
        std::cout<<"baaj";
    }
    unsigned char block_id_char;
    fin.read((char *) &block_id_char, 1);
    int block_id = (int) block_id_char;

    char length[8];
    fin.read((char*) length, 8);
    unsigned long blocklength =   static_cast<uint64_t>(length[0]) |
                                  static_cast<uint64_t>(length[1]) << 8 |
                                  static_cast<uint64_t>(length[2]) << 16 |
                                  static_cast<uint64_t>(length[3]) << 24 |
                                  static_cast<uint64_t>(length[4]) << 32 |
                                  static_cast<uint64_t>(length[5]) << 40 |
                                  static_cast<uint64_t>(length[6]) << 48 |
                                  static_cast<uint64_t>(length[7]) << 56;

    std::cout<<blocklength;
    return 0;
}
