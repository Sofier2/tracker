import time

# ==========================================================
# Початковий та цільовий стани гри "8 пазл"
# ==========================================================
start = ((5,6,7),
         (8,0,1),
         (2,3,4))

goal = ((1,2,3),
        (4,5,6),
        (7,8,0))

# ==========================================================
# Допоміжні функції
# ==========================================================
def print_state(state):
    for row in state:
        print(row)
    print()

def find_zero(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j

def get_neighbors(state):
    neighbors = []
    x, y = find_zero(state)
    moves = [(-1,0),(1,0),(0,-1),(0,1)]  # ↑ ↓ ← →
    for dx, dy in moves:
        nx, ny = x+dx, y+dy
        if 0 <= nx < 3 and 0 <= ny < 3:
            new_state = [list(row) for row in state]
            new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
            neighbors.append(tuple(tuple(row) for row in new_state))
    return neighbors

# ==========================================================
# 1️⃣ DFS до 3 рівня дерева
# ==========================================================
def dfs_three_levels():
    print("=== ДЕРЕВО ДО 3 РІВНЯ (DFS) ===\n")
    stack = [(start, 0)]
    visited = set([start])

    while stack:
        state, depth = stack.pop()

        if depth > 2:
            continue

        print(f"Рівень {depth}:")
        print_state(state)

        if depth < 2:
            for neighbor in get_neighbors(state):
                if neighbor not in visited:
                    visited.add(neighbor)
                    stack.append((neighbor, depth+1))

# ==========================================================
# 2️⃣ Повний DFS
# ==========================================================
def dfs_full(step_mode=False, max_depth=1000):
    stack = [(start, 0)]
    visited = set([start])
    generated = 1
    rejected = 0
    start_time = time.time()

    while stack:
        state, depth = stack.pop()

        if step_mode:
            print(f"Глибина {depth}")
            print_state(state)
            input("Enter для наступного кроку...")

        if state == goal:
            end_time = time.time()
            return {
                "depth": depth,
                "generated": generated,
                "stored": len(visited),
                "rejected": rejected,
                "time": end_time - start_time
            }

        if depth >= max_depth:
            continue

        for neighbor in get_neighbors(state):
            generated += 1
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append((neighbor, depth+1))
            else:
                rejected += 1

    return None

# ==========================================================
# 🔷 Головне меню
# ==========================================================
print("1 - Показати дерево до 3 рівня (DFS)")
print("2 - Повний пошук у глибину (DFS) автоматично")
print("3 - Повний пошук у глибину (DFS) покроково")

choice = input("Оберіть режим: ")

if choice == "1":
    dfs_three_levels()

elif choice == "2":
    result = dfs_full()
    print("\n=== РЕЗУЛЬТАТ DFS ===")
    print(result)

elif choice == "3":
    result = dfs_full(step_mode=True)
    print("\n=== РЕЗУЛЬТАТ DFS покроково ===")
    print(result)
