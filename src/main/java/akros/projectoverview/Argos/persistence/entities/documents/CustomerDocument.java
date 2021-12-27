package akros.projectoverview.Argos.persistence.entities.documents;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Document("customer")
public class CustomerDocument {

    @Id
    private String id;

    private String name;

    private List<String> projects;

}
