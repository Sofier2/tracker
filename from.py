# Імпортуємо необхідні модулі
from collections import deque   # для реалізації черги (BFS працює через чергу)
import time                     # для вимірювання часу виконання алгоритму


# ==========================================================
# Початковий та цільовий стани гри "8 пазл"
# 0 позначає порожню клітинку
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
    """
    Функція виводу стану у зручному форматі 3×3
    """
    for row in state:
        print(row)
    print()


def find_zero(state):
    """
    Функція знаходить координати порожньої клітинки (0)
    """
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j


def get_neighbors(state):
    """
    Функція генерує всі можливі допустимі ходи
    (переміщення порожньої клітинки ↑ ↓ ← →)
    """
    neighbors = []
    x, y = find_zero(state)

    # Можливі напрямки руху
    moves = [(-1,0),(1,0),(0,-1),(0,1)]  # ↑ ↓ ← →

    for dx, dy in moves:
        nx, ny = x+dx, y+dy

        # Перевірка, щоб не вийти за межі поля 3×3
        if 0 <= nx < 3 and 0 <= ny < 3:

            # Створюємо копію стану
            new_state = [list(row) for row in state]

            # Міняємо місцями 0 і сусідній елемент
            new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]

            # Додаємо новий стан у список
            neighbors.append(tuple(tuple(row) for row in new_state))

    return neighbors


# ==========================================================
# 1️⃣ Побудова дерева до 3 рівня (ручна частина лабораторної)
# ==========================================================

def bfs_three_levels():
    """
    Функція виконує BFS тільки до 3 рівня дерева пошуку
    (глибина 0, 1 та 2)
    """
    print("=== ДЕРЕВО ДО 3 РІВНЯ ===\n")

    # Черга містить пару (стан, глибина)
    queue = deque([(start, 0)])

    # Множина відвіданих станів
    visited = set([start])

    while queue:
        state, depth = queue.popleft()

        # Якщо глибина більше 2 — не розширюємо далі
        if depth > 2:
            continue

        print(f"Рівень {depth}:")
        print_state(state)

        # Генеруємо наступний рівень
        if depth < 2:
            for neighbor in get_neighbors(state):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, depth+1))


# ==========================================================
# 2️⃣ Повний алгоритм пошуку в ширину
# ==========================================================

def bfs_full(step_mode=False):
    """
    Повна реалізація BFS до знаходження рішення.
    Параметр step_mode дозволяє виконувати алгоритм покроково.
    """

    queue = deque([(start, 0)])     # черга
    visited = set([start])          # база відвіданих станів

    generated = 1   # кількість згенерованих станів
    rejected = 0    # кількість відкинутих станів (повторів)

    start_time = time.time()  # початок вимірювання часу

    while queue:
        state, depth = queue.popleft()

        # Покроковий режим
        if step_mode:
            print(f"Глибина {depth}")
            print_state(state)
            input("Enter для наступного кроку...")

        # Якщо досягли цільового стану — завершуємо
        if state == goal:
            end_time = time.time()
            return {
                "depth": depth,                   # глибина знайденого рішення
                "generated": generated,           # згенеровано станів
                "stored": len(visited),           # занесено в базу
                "rejected": rejected,             # відкинуто
                "time": end_time - start_time     # час виконання
            }

        # Генерація сусідніх станів
        for neighbor in get_neighbors(state):
            generated += 1
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, depth+1))
            else:
                rejected += 1

    return None


# ==========================================================
# 🔷 Головне меню програми
# ==========================================================

print("1 - Показати дерево до 3 рівня")
print("2 - Повний пошук (автоматично)")
print("3 - Повний пошук (покроково)")

choice = input("Оберіть режим: ")

if choice == "1":
    bfs_three_levels()

elif choice == "2":
    result = bfs_full()
    print("\n=== РЕЗУЛЬТАТ ===")
    print(result)

elif choice == "3":
    result = bfs_full(step_mode=True)
    print("\n=== РЕЗУЛЬТАТ ===")
    print(result)
