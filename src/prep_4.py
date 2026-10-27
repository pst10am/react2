

def is_magic(num: int) -> bool:
    num_str = str(num)
    num_len = len(num_str)

    if num_len == 1:
        return True

    if "0" in num_str or len(set(num_str)) != num_len:
        return False

    visited_pos = set()
    num_pos = 0
    for _ in range(num_len):
        num_a = int(num_str[num_pos])
        # print('current pos:', num_pos, num_a)
        num_pos = (num_pos + num_a) % num_len
        visited_pos.add(num_pos)

    if num_pos != 0: # correct must be back at the first letter, wrong -> next_num != int(num_str[0]):
        return False

    # print('sorted(seen) = ', sorted(seen))
    # print('sorted(num_str) = ', sorted(num_str))
    return len(visited_pos) == num_len



def main_dev():
    chk_num = 6231
    chk_res = is_magic(chk_num)
    print('{} is {}magic number'.format(chk_num, "" if chk_res else "not a "))


def main():
    magic_nums = []
    for i in range(100, 900):
        chk_res = is_magic(i)
        if not chk_res:
            continue
        magic_nums.append(i)
    print(magic_nums)


if __name__ == "__main__":
    main()
