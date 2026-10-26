
def clock_angle(h: int, m: int) -> float:

    # 60 min move 360 deg (360 deg/60 min = 6 deg/min)
    angle_min = (360/60) * m 

    # 60 min move 30 deg
    # at 12 = 0 deg, 13 = 1, 14 = 2
    angle_hour_a = 30 * (h % 12) 

    # 60 min hour hand move 30 deg (1 slot of 12 slots)
    #  1 min hour hand move (30/60)
    #  X min hour hand move (30/60) * X
    angle_hour = angle_hour_a + ((30/60) * m)

    print('hour_deg:{}, min_deg:{}'.format(angle_hour, angle_min))

    angle_1 = abs(angle_min - angle_hour)
    angle_2 = 360 - angle_1

    print('angle_1:{}, angle_2:{}'.format(angle_1, angle_2))

    return round(min(angle_1, angle_2), 2)


def main_dev():
    result = clock_angle(3, 30)
    print(result)


def main():
    tests = [(3, 0, 90.0), (3, 30, 75.0), (0, 0, 0.0), (12, 0, 0.0),
             (6, 0, 180.0), (23, 59, 5.5), (9, 45, 22.5)]
    for h, m, expected in tests:
        result = clock_angle(h, m)
        if result == expected:
            status = "OK"
        else:
            status = "FAIL"
        print(h, m, result, expected, status)

if __name__ == "__main__":
    main()