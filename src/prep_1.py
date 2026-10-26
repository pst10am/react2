
bom = [
    ("CART",     "BATTERY",  1),
    ("CART",     "WHEEL",    4),
    ("CART",     "BOLT",     10),
    ("BATTERY",  "CELL",     100),
    ("BATTERY",  "BOLT",     4),
    ("WHEEL",    "TIRE",     1),
    ("WHEEL",    "BOLT",     5),
]

def explode(bom, product, qty):
    if qty <= 0:
        return {}

    main_bom = {}
    for parent, child, qty_per in bom:
        if parent not in main_bom:
            main_bom[parent] = {}
        main_bom[parent][child] = main_bom[parent].get(child, 0) + qty_per
        if child not in main_bom:
            main_bom[child] = {}
    
    if product not in main_bom:
        raise ValueError("Unknown product: {}".format(product))

    raw_mats = {}

    prd_bom = []
    prd_bom.append((product, qty, (product,)))
    while prd_bom:
        part, need, path = prd_bom.pop()
        children = main_bom[part]
        if not children:
            if part not in raw_mats:
                raw_mats[part] = 0
            raw_mats[part] += need
        for child, qty_per in children.items():
            if child in path:
                raise ValueError("Cyclic bom detected {}".format("->".join(path + (child,))))
            prd_bom.append((child, qty_per * need, path + (child,)))

    return raw_mats

def main():
    raw_mats = explode(bom, "CART", 2)
    print(raw_mats)

    bad_bom = bom + [("CELL", "BATTERY", 1)]   # CELL uses BATTERY, BATTERY uses CELL
    try:
        explode(bad_bom, "CART", 1)
    except ValueError as e:
        print(e)

if __name__ == "__main__":
    main()
